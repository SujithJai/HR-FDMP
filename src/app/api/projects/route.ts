import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    projectCode: "PRJ-001",
    title: "Project Kaal - Feature Film",
    type: "Feature Film",
    stage: "Post-Production",
    budget: 45000000,
    spent: 32000000,
    startDate: "2024-01-15",
    targetReleaseDate: "2025-04-14",
    status: "Active",
    director: "Sujai",
    producer: "Four Dee Motion Pictures",
  },
  {
    id: "proj-2",
    projectCode: "PRJ-002",
    title: "Cyber City - Web Series Season 1",
    type: "Web Series",
    stage: "Production",
    budget: 28000000,
    spent: 19500000,
    startDate: "2024-03-01",
    targetReleaseDate: "2025-08-20",
    status: "Active",
    director: "Vikram Seth",
    producer: "Four Dee Motion Pictures",
  },
  {
    id: "proj-3",
    projectCode: "PRJ-003",
    title: "The Legend of Chola - Animation Docu",
    type: "Documentary",
    stage: "Pre-Production",
    budget: 15000000,
    spent: 4200000,
    startDate: "2024-06-01",
    targetReleaseDate: "2026-01-10",
    status: "Active",
    director: "Ananya Rao",
    producer: "Four Dee Motion Pictures",
  },
];

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const dbProjects = await db.select().from(projects);
      if (dbProjects && dbProjects.length > 0) {
        return NextResponse.json({ success: true, data: dbProjects });
      }
    }
  } catch (err) {
    console.warn("DB projects fetch fallback:", err);
  }

  return NextResponse.json({ success: true, data: DEFAULT_PROJECTS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProject = {
      id: `proj-${Date.now()}`,
      projectCode: body.projectCode || `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      title: body.title || "Untitled Production",
      type: body.type || "Feature Film",
      stage: body.stage || "Pre-Production",
      budget: Number(body.budget) || 10000000,
      spent: Number(body.spent) || 0,
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      targetReleaseDate: body.targetReleaseDate || "2026-12-31",
      status: "Active",
      director: body.director || "Unassigned",
      producer: body.producer || "Four Dee Motion Pictures",
    };

    if (process.env.DATABASE_URL) {
      try {
        await db.insert(projects).values({
          code: newProject.projectCode,
          name: newProject.title,
          type: "movie",
          stage: "pre_production",
          budget: newProject.budget.toString(),
          spent: newProject.spent.toString(),
          status: "active",
        });
      } catch (dbErr) {
        console.warn("Could not insert project into DB:", dbErr);
      }
    }

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create project" },
      { status: 500 }
    );
  }
}
