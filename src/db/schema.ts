import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  numeric,
  jsonb,
  uuid,
  pgEnum,
  date,
  time,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// ENUMS
// ============================================================
export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "admin",
  "hr",
  "manager",
  "team_lead",
  "employee",
  "intern",
  "freelancer",
]);

export const employeeStatusEnum = pgEnum("employee_status", [
  "active",
  "inactive",
  "terminated",
  "probation",
]);

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "half_day",
  "leave",
  "holiday",
  "wfh",
  "early_exit",
]);

export const attendanceMethodEnum = pgEnum("attendance_method", [
  "biometric",
  "qr_check_in",
  "qr_check_out",
  "web_check_in",
  "manual",
]);

export const leaveStatusEnum = pgEnum("leave_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const leaveTypeEnum = pgEnum("leave_type", [
  "casual",
  "sick",
  "earned",
  "maternity",
  "paternity",
  "unpaid",
  "comp_off",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "review",
  "done",
  "blocked",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const expenseStatusEnum = pgEnum("expense_status", [
  "pending",
  "approved",
  "rejected",
  "paid",
]);

export const visitorStatusEnum = pgEnum("visitor_status", [
  "expected",
  "checked_in",
  "checked_out",
  "cancelled",
]);

export const projectStageEnum = pgEnum("project_stage", [
  "pre_production",
  "production",
  "post_production",
  "released",
  "archived",
]);

export const projectTypeEnum = pgEnum("project_type", [
  "movie",
  "web_series",
  "commercial",
  "music_video",
]);

export const assetTypeEnum = pgEnum("asset_type", [
  "poster",
  "trailer",
  "video",
  "photo",
  "audio",
  "script",
  "storyboard",
  "press_kit",
  "brand_asset",
]);

export const approvalStatusEnum = pgEnum("approval_status", [
  "draft",
  "pending",
  "approved",
  "rejected",
]);

export const noticeTypeEnum = pgEnum("notice_type", [
  "announcement",
  "policy",
  "event",
  "urgent",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "attendance",
  "task",
  "leave",
  "payroll",
  "birthday",
  "announcement",
  "system",
]);

// ============================================================
// COMPANY / BRANDING
// ============================================================
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  primaryColor: text("primary_color").default("#0F5FFF"),
  secondaryColor: text("secondary_color").default("#00C8FF"),
  accentColor: text("accent_color").default("#FFD700"),
  address: text("address"),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  workingHoursStart: time("working_hours_start").default("09:00:00"),
  workingHoursEnd: time("working_hours_end").default("18:00:00"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// USERS & EMPLOYEES
// ============================================================
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    employeeId: text("employee_id").notNull().unique(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name").notNull(),
    avatarUrl: text("avatar_url"),
    role: userRoleEnum("role").default("employee").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    rememberMeToken: text("remember_me_token"),
    lastLoginAt: timestamp("last_login_at"),
    lastLoginIp: text("last_login_ip"),
    sessionExpiry: timestamp("session_expiry"),
    twoFactorEnabled: boolean("two_factor_enabled").default(false),
    faceRecognitionEnabled: boolean("face_recognition_enabled").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    employeeIdx: uniqueIndex("users_employee_idx").on(t.employeeId),
  })
);

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  employeeCode: text("employee_code").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  photoUrl: text("photo_url"),
  department: text("department").notNull(),
  designation: text("designation").notNull(),
  salary: numeric("salary", { precision: 12, scale: 2 }).default("0"),
  email: text("email").notNull(),
  phone: text("phone"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  dateOfBirth: date("date_of_birth"),
  gender: text("gender"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country").default("India"),
  postalCode: text("postal_code"),
  joiningDate: date("joining_date").notNull(),
  reportingManagerId: uuid("reporting_manager_id"),
  status: employeeStatusEnum("status").default("active").notNull(),
  bankAccountNumber: text("bank_account_number"),
  bankIfsc: text("bank_ifsc"),
  bankName: text("bank_name"),
  panNumber: text("pan_number"),
  aadharNumber: text("aadhar_number"),
  pfNumber: text("pf_number"),
  uanNumber: text("uan_number"),
  biometricId: text("biometric_id"),
  qrCode: text("qr_code"),
  skills: jsonb("skills").$type<string[]>().default([]),
  socialLinks: jsonb("social_links").$type<Record<string, string>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// ATTENDANCE
// ============================================================
export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  status: attendanceStatusEnum("status").default("present").notNull(),
  method: attendanceMethodEnum("method").default("web_check_in").notNull(),
  workingHours: numeric("working_hours", { precision: 5, scale: 2 }).default("0"),
  breakHours: numeric("break_hours", { precision: 5, scale: 2 }).default("0"),
  lateMinutes: integer("late_minutes").default(0),
  overtimeMinutes: integer("overtime_minutes").default(0),
  checkInLocation: text("check_in_location"),
  checkOutLocation: text("check_out_location"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// LEAVES
// ============================================================
export const leaveTypes = pgTable("leave_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  code: leaveTypeEnum("code").notNull(),
  annualQuota: integer("annual_quota").default(12),
  isPaid: boolean("is_paid").default(true),
  requiresAttachment: boolean("requires_attachment").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leaves = pgTable("leaves", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  leaveTypeId: uuid("leave_type_id").references(() => leaveTypes.id),
  type: leaveTypeEnum("type").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDays: numeric("total_days", { precision: 5, scale: 2 }).notNull(),
  reason: text("reason"),
  status: leaveStatusEnum("status").default("pending").notNull(),
  approvedBy: uuid("approved_by"),
  approvedAt: timestamp("approved_at"),
  rejectionReason: text("rejection_reason"),
  attachmentUrl: text("attachment_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// HOLIDAYS
// ============================================================
export const holidays = pgTable("holidays", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  type: text("type").default("public"),
  isOptional: boolean("is_optional").default(false),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// PAYROLL
// ============================================================
export const payrollRuns = pgTable("payroll_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  status: text("status").default("draft").notNull(),
  totalEmployees: integer("total_employees").default(0),
  totalGross: numeric("total_gross", { precision: 14, scale: 2 }).default("0"),
  totalDeductions: numeric("total_deductions", { precision: 14, scale: 2 }).default("0"),
  totalNet: numeric("total_net", { precision: 14, scale: 2 }).default("0"),
  processedBy: uuid("processed_by"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payslips = pgTable("payslips", {
  id: uuid("id").defaultRandom().primaryKey(),
  payrollRunId: uuid("payroll_run_id").references(() => payrollRuns.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  basicSalary: numeric("basic_salary", { precision: 12, scale: 2 }).default("0"),
  hra: numeric("hra", { precision: 12, scale: 2 }).default("0"),
  allowances: numeric("allowances", { precision: 12, scale: 2 }).default("0"),
  bonus: numeric("bonus", { precision: 12, scale: 2 }).default("0"),
  overtime: numeric("overtime", { precision: 12, scale: 2 }).default("0"),
  gross: numeric("gross", { precision: 12, scale: 2 }).default("0"),
  tax: numeric("tax", { precision: 12, scale: 2 }).default("0"),
  pf: numeric("pf", { precision: 12, scale: 2 }).default("0"),
  esi: numeric("esi", { precision: 12, scale: 2 }).default("0"),
  otherDeductions: numeric("other_deductions", { precision: 12, scale: 2 }).default("0"),
  totalDeductions: numeric("total_deductions", { precision: 12, scale: 2 }).default("0"),
  net: numeric("net", { precision: 12, scale: 2 }).default("0"),
  workingDays: integer("working_days").default(0),
  paidDays: integer("paid_days").default(0),
  lopDays: integer("lop_days").default(0),
  status: text("status").default("draft").notNull(),
  paidOn: timestamp("paid_on"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// TASKS & WORK REPORTS
// ============================================================
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  assigneeId: uuid("assignee_id").references(() => employees.id),
  creatorId: uuid("creator_id").references(() => employees.id),
  projectId: uuid("project_id"),
  status: taskStatusEnum("status").default("todo").notNull(),
  priority: taskPriorityEnum("priority").default("medium").notNull(),
  dueDate: date("due_date"),
  completedAt: timestamp("completed_at"),
  estimatedHours: numeric("estimated_hours", { precision: 6, scale: 2 }),
  actualHours: numeric("actual_hours", { precision: 6, scale: 2 }),
  tags: jsonb("tags").$type<string[]>().default([]),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dailyWorkReports = pgTable("daily_work_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  tasksCompleted: text("tasks_completed").notNull(),
  tasksPlanned: text("tasks_planned"),
  blockers: text("blockers"),
  hoursWorked: numeric("hours_worked", { precision: 5, scale: 2 }).default("0"),
  productivityScore: integer("productivity_score").default(0),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// EXPENSES
// ============================================================
export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  expenseDate: date("expense_date").notNull(),
  receiptUrl: text("receipt_url"),
  status: expenseStatusEnum("status").default("pending").notNull(),
  approvedBy: uuid("approved_by"),
  approvedAt: timestamp("approved_at"),
  projectId: uuid("project_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// VISITORS
// ============================================================
export const visitors = pgTable("visitors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  company: text("company"),
  purpose: text("purpose").notNull(),
  hostId: uuid("host_id").references(() => employees.id),
  photoUrl: text("photo_url"),
  idProofType: text("id_proof_type"),
  idProofNumber: text("id_proof_number"),
  badgeNumber: text("badge_number"),
  status: visitorStatusEnum("status").default("expected").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  expectedAt: timestamp("expected_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// NOTICES & DOCUMENTS
// ============================================================
export const notices = pgTable("notices", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: noticeTypeEnum("type").default("announcement").notNull(),
  priority: text("priority").default("normal"),
  isPinned: boolean("is_pinned").default(false),
  expiresAt: timestamp("expires_at"),
  publishedBy: uuid("published_by"),
  publishedAt: timestamp("published_at").defaultNow(),
  attachments: jsonb("attachments").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  uploadedBy: uuid("uploaded_by"),
  employeeId: uuid("employee_id").references(() => employees.id),
  isPublic: boolean("is_public").default(false),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// PROJECTS (PRODUCTION CRM)
// ============================================================
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  type: projectTypeEnum("type").notNull(),
  stage: projectStageEnum("stage").default("pre_production").notNull(),
  posterUrl: text("poster_url"),
  coverUrl: text("cover_url"),
  director: text("director"),
  producer: text("producer"),
  budget: numeric("budget", { precision: 14, scale: 2 }),
  spent: numeric("spent", { precision: 14, scale: 2 }).default("0"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  releaseDate: date("release_date"),
  progress: integer("progress").default(0),
  status: text("status").default("active"),
  genre: text("genre"),
  language: text("language"),
  cast: jsonb("cast").$type<string[]>().default([]),
  crew: jsonb("crew").$type<Record<string, string>>().default({}),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// DIGITAL ASSET MANAGEMENT
// ============================================================
export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: assetTypeEnum("type").notNull(),
  projectId: uuid("project_id").references(() => projects.id),
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  previewUrl: text("preview_url"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  width: integer("width"),
  height: integer("height"),
  duration: integer("duration"),
  version: integer("version").default(1),
  currentVersion: boolean("current_version").default(true),
  approvalStatus: approvalStatusEnum("approval_status").default("draft").notNull(),
  approvedBy: uuid("approved_by"),
  approvedAt: timestamp("approved_at"),
  tags: jsonb("tags").$type<string[]>().default([]),
  categories: jsonb("categories").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  uploadedBy: uuid("uploaded_by"),
  downloads: integer("downloads").default(0),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assetVersions = pgTable("asset_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetId: uuid("asset_id")
    .notNull()
    .references(() => assets.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  changes: text("changes"),
  uploadedBy: uuid("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// NOTIFICATIONS & ACTIVITY
// ============================================================
export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  link: text("link"),
  isRead: boolean("is_read").default(false).notNull(),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  details: jsonb("details").$type<Record<string, unknown>>(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  employeeId: uuid("employee_id"),
  action: text("action").notNull(),
  description: text("description").notNull(),
  entity: text("entity"),
  entityId: text("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// ROLES & PERMISSIONS
// ============================================================
export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  permissions: jsonb("permissions").$type<string[]>().default([]),
  isSystem: boolean("is_system").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// SETTINGS
// ============================================================
export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value"),
  category: text("category").default("general"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// RELATIONS
// ============================================================
export const usersRelations = relations(users, ({ one, many }) => ({
  employee: one(employees, {
    fields: [users.id],
    references: [employees.userId],
  }),
  notifications: many(notifications),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  user: one(users, {
    fields: [employees.userId],
    references: [users.id],
  }),
  attendance: many(attendance),
  leaves: many(leaves),
  tasks: many(tasks),
  expenses: many(expenses),
  dailyReports: many(dailyWorkReports),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  assets: many(assets),
}));

export const assetsRelations = relations(assets, ({ one, many }) => ({
  project: one(projects, {
    fields: [assets.projectId],
    references: [projects.id],
  }),
  versions: many(assetVersions),
}));
