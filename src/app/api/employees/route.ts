import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { employees } from "@/db/schema";

const DEFAULT_EMPLOYEES = [
  {
    id: "emp-1",
    employeeCode: "FD-001",
    firstName: "Sujai",
    lastName: "Director",
    email: "sujai@fourdee.com",
    department: "Executive",
    designation: "Managing Director",
    employmentType: "Full-Time",
    status: "Active",
    joiningDate: "2024-01-01",
    location: "Chennai HQ",
    photoUrl: null,
  },
  {
    id: "emp-2",
    employeeCode: "FD-002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@fourdee.com",
    department: "Human Resources",
    designation: "HR Lead",
    employmentType: "Full-Time",
    status: "Active",
    joiningDate: "2024-02-15",
    location: "Chennai HQ",
    photoUrl: null,
  },
  {
    id: "emp-3",
    employeeCode: "FD-003",
    firstName: "Vikram",
    lastName: "Seth",
    email: "vikram@fourdee.com",
    department: "Production",
    designation: "Executive Producer",
    employmentType: "Full-Time",
    status: "Active",
    joiningDate: "2024-03-01",
    location: "Mumbai Studio",
    photoUrl: null,
  },
  {
    id: "emp-4",
    employeeCode: "FD-004",
    firstName: "Ananya",
    lastName: "Rao",
    email: "ananya@fourdee.com",
    department: "VFX & Animation",
    designation: "VFX Supervisor",
    employmentType: "Full-Time",
    status: "Active",
    joiningDate: "2024-04-10",
    location: "Hyderabad Lab",
    photoUrl: null,
  },
];

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const dbEmployees = await db.select().from(employees);
      if (dbEmployees && dbEmployees.length > 0) {
        return NextResponse.json({ success: true, data: dbEmployees });
      }
    }
  } catch (err) {
    console.warn("DB fetch fallback to default employees:", err);
  }

  return NextResponse.json({ success: true, data: DEFAULT_EMPLOYEES });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newEmp = {
      id: `emp-${Date.now()}`,
      employeeCode: body.employeeCode || `FD-${Math.floor(100 + Math.random() * 900)}`,
      firstName: body.firstName || "New",
      lastName: body.lastName || "Employee",
      email: body.email || `user${Date.now()}@fourdee.com`,
      department: body.department || "Production",
      designation: body.designation || "Team Member",
      employmentType: body.employmentType || "Full-Time",
      status: "Active",
      joiningDate: body.joiningDate || new Date().toISOString().split("T")[0],
      location: body.location || "Chennai HQ",
      photoUrl: body.photoUrl || null,
    };

    if (process.env.DATABASE_URL) {
      try {
        await db.insert(employees).values({
          employeeCode: newEmp.employeeCode,
          firstName: newEmp.firstName,
          lastName: newEmp.lastName,
          email: newEmp.email,
          department: newEmp.department,
          designation: newEmp.designation,
          joiningDate: new Date(newEmp.joiningDate),
          status: "active",
        });
      } catch (dbErr) {
        console.warn("Could not insert employee into database:", dbErr);
      }
    }

    return NextResponse.json({ success: true, data: newEmp }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create employee" },
      { status: 500 }
    );
  }
}
