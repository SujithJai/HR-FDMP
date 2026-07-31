import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { users, employees, auditLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "fourdee-motion-pictures-enterprise-secret-key-2024";
const JWT_EXPIRES_IN = "7d";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  employeeId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function loginUser(email: string, password: string, ipAddress?: string, userAgent?: string) {
  // Find user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Account is deactivated");
  }

  // Verify password
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Get employee details
  const [employee] = await db
    .select()
    .from(employees)
    .where(eq(employees.userId, user.id))
    .limit(1);

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    employeeId: employee?.employeeCode || "",
  });

  // Update last login
  await db
    .update(users)
    .set({
      lastLoginAt: new Date(),
      lastLoginIp: ipAddress,
      sessionExpiry: new Date(Date.now() + SESSION_TIMEOUT_MS),
    })
    .where(eq(users.id, user.id));

  // Log audit
  await db.insert(auditLogs).values({
    userId: user.id,
    action: "login",
    entity: "user",
    entityId: user.id,
    ipAddress,
    userAgent,
    details: { email: user.email, role: user.role },
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      employeeId: user.employeeId,
    },
    employee: employee
      ? {
          id: employee.id,
          employeeCode: employee.employeeCode,
          firstName: employee.firstName,
          lastName: employee.lastName,
          department: employee.department,
          designation: employee.designation,
          photoUrl: employee.photoUrl,
        }
      : null,
  };
}

export async function validateSession(token: string) {
  const payload = verifyToken(token);
  if (!payload) {
    throw new Error("Invalid or expired token");
  }

  // Get user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1);

  if (!user || !user.isActive) {
    throw new Error("User not found or inactive");
  }

  // Check session expiry
  if (user.sessionExpiry && new Date() > user.sessionExpiry) {
    throw new Error("Session expired");
  }

  // Extend session
  await db
    .update(users)
    .set({
      sessionExpiry: new Date(Date.now() + SESSION_TIMEOUT_MS),
    })
    .where(eq(users.id, user.id));

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      employeeId: user.employeeId,
    },
  };
}

export async function logoutUser(userId: string, ipAddress?: string) {
  await db
    .update(users)
    .set({
      sessionExpiry: null,
    })
    .where(eq(users.id, userId));

  await db.insert(auditLogs).values({
    userId,
    action: "logout",
    entity: "user",
    entityId: userId,
    ipAddress,
  });
}

export function requireRole(userRole: string, allowedRoles: string[]) {
  if (!allowedRoles.includes(userRole)) {
    throw new Error("Insufficient permissions");
  }
}
