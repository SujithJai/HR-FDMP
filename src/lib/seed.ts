import { db } from "@/db";
import * as schema from "@/db/schema";
import { hashPassword } from "@/lib/auth";

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

export async function seedDatabase() {
  // Check if data already exists
  const [existingCompany] = await db.select().from(schema.companies).limit(1);
  if (existingCompany) {
    return { seeded: false, message: "Database already seeded" };
  }

  // Create company
  const [company] = await db
    .insert(schema.companies)
    .values({
      name: "Four Dee Motion Pictures",
      tagline: "Where Stories Come Alive",
      primaryColor: "#0F5FFF",
      secondaryColor: "#00C8FF",
      accentColor: "#FFD700",
      address: "Mumbai, Maharashtra, India",
      email: "hr@fourdee.motionpictures",
      phone: "+91 98765 43210",
      website: "https://fourdee.motionpictures",
      workingHoursStart: "09:00:00",
      workingHoursEnd: "18:00:00",
    })
    .returning();

  // Create demo users
  const passwordHash = await hashPassword("demo123");

  const usersToCreate = [
    {
      employeeId: "4DMP001",
      email: "admin@fourdee.com",
      fullName: "Arjun Kapoor",
      role: "super_admin" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
    {
      employeeId: "4DMP002",
      email: "hr@fourdee.com",
      fullName: "Priya Sharma",
      role: "hr" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
      employeeId: "4DMP003",
      email: "manager@fourdee.com",
      fullName: "Rohan Mehta",
      role: "manager" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=13",
    },
    {
      employeeId: "4DMP004",
      email: "rahul@fourdee.com",
      fullName: "Rahul Verma",
      role: "employee" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=8",
    },
    {
      employeeId: "4DMP005",
      email: "ananya@fourdee.com",
      fullName: "Ananya Iyer",
      role: "employee" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=9",
    },
    {
      employeeId: "4DMP006",
      email: "vikram@fourdee.com",
      fullName: "Vikram Singh",
      role: "employee" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=14",
    },
    {
      employeeId: "4DMP007",
      email: "meera@fourdee.com",
      fullName: "Meera Nair",
      role: "employee" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=16",
    },
    {
      employeeId: "4DMP008",
      email: "aditya@fourdee.com",
      fullName: "Aditya Rao",
      role: "employee" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    {
      employeeId: "4DMP009",
      email: "kavya@fourdee.com",
      fullName: "Kavya Reddy",
      role: "intern" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=20",
    },
    {
      employeeId: "4DMP010",
      email: "arjun.f@fourdee.com",
      fullName: "Arjun Freelance",
      role: "freelancer" as const,
      avatarUrl: "https://i.pravatar.cc/150?img=60",
    },
  ];

  const createdUsers = [];
  for (const u of usersToCreate) {
    const [user] = await db
      .insert(schema.users)
      .values({
        employeeId: u.employeeId,
        email: u.email,
        passwordHash,
        fullName: u.fullName,
        role: u.role,
        avatarUrl: u.avatarUrl,
        isActive: true,
      })
      .returning();
    createdUsers.push(user);
  }

  // Create employees
  const departments = [
    "Production",
    "Direction",
    "Cinematography",
    "Editing",
    "Sound Design",
    "VFX",
    "Marketing",
    "Human Resources",
    "Finance",
    "Administration",
  ];

  const designations = [
    "Managing Director",
    "HR Manager",
    "Production Manager",
    "Cinematographer",
    "Film Editor",
    "VFX Artist",
    "Sound Designer",
    "Marketing Head",
    "Assistant Director",
    "Production Assistant",
  ];

  const employeesData = createdUsers.map((u, idx) => ({
    userId: u.id,
    employeeCode: u.employeeId,
    firstName: u.fullName.split(" ")[0],
    lastName: u.fullName.split(" ").slice(1).join(" "),
    photoUrl: u.avatarUrl,
    department: departments[idx % departments.length],
    designation: designations[idx % designations.length],
    salary: (50000 + idx * 10000).toString(),
    email: u.email,
    phone: `+91 98${7000000 + idx * 1111}`,
    joiningDate: toDateString(new Date(2022, idx % 12, (idx % 27) + 1)),
    status: "active" as const,
    skills: ["Filmmaking", "Storytelling", "Leadership"],
    dateOfBirth: toDateString(new Date(1990 + (idx % 10), idx % 12, (idx % 27) + 1)),
    gender: idx % 2 === 0 ? "Male" : "Female",
    city: "Mumbai",
    country: "India",
  }));

  const createdEmployees = await db.insert(schema.employees).values(employeesData).returning();

  // Create leave types
  await db.insert(schema.leaveTypes).values([
    { name: "Casual Leave", code: "casual", annualQuota: 12, isPaid: true },
    { name: "Sick Leave", code: "sick", annualQuota: 12, isPaid: true },
    { name: "Earned Leave", code: "earned", annualQuota: 15, isPaid: true },
    { name: "Maternity Leave", code: "maternity", annualQuota: 180, isPaid: true },
    { name: "Paternity Leave", code: "paternity", annualQuota: 15, isPaid: true },
    { name: "Comp Off", code: "comp_off", annualQuota: 10, isPaid: true },
  ]);

  // Create holidays
  const currentYear = new Date().getFullYear();
  const holidaysList = [
    { name: "Republic Day", date: new Date(currentYear, 0, 26) },
    { name: "Holi", date: new Date(currentYear, 2, 25) },
    { name: "Good Friday", date: new Date(currentYear, 2, 29) },
    { name: "Eid al-Fitr", date: new Date(currentYear, 3, 10) },
    { name: "Labour Day", date: new Date(currentYear, 4, 1) },
    { name: "Independence Day", date: new Date(currentYear, 7, 15) },
    { name: "Gandhi Jayanti", date: new Date(currentYear, 9, 2) },
    { name: "Diwali", date: new Date(currentYear, 10, 1) },
    { name: "Christmas", date: new Date(currentYear, 11, 25) },
  ];

  await db.insert(schema.holidays).values(
    holidaysList.map((h) => ({
      name: h.name,
      date: toDateString(h.date),
      type: "public",
      year: currentYear,
    }))
  );

  // Create attendance for last 30 days
  const attendanceRecords = [];
  for (const emp of createdEmployees) {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const statuses = ["present", "present", "present", "present", "late", "wfh", "present"] as const;
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const checkInHour = status === "late" ? 10 + Math.floor(Math.random() * 2) : 9;
      const checkInMin = Math.floor(Math.random() * 60);
      const checkIn = new Date(date);
      checkIn.setHours(checkInHour, checkInMin, 0);

      const checkOut = new Date(date);
      checkOut.setHours(18 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);

      const workingHours = ((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60)).toFixed(2);
      const lateMinutes = status === "late" ? Math.floor(Math.random() * 60) : 0;

      attendanceRecords.push({
        employeeId: emp.id,
        date: toDateString(date),
        checkIn,
        checkOut,
        status,
        method: "web_check_in" as const,
        workingHours,
        lateMinutes,
        breakHours: "1.00",
      });
    }
  }

  if (attendanceRecords.length > 0) {
    await db.insert(schema.attendance).values(attendanceRecords);
  }

  // Create projects
  const projectsData = [
    {
      name: "Midnight in Mumbai",
      code: "MIM-2024",
      description: "A gripping thriller set in the heart of Mumbai's underworld",
      type: "movie" as const,
      stage: "post_production" as const,
      director: "Sanjay Gupta",
      producer: "Arjun Kapoor",
      budget: "250000000",
      spent: "200000000",
      progress: 80,
      genre: "Thriller",
      language: "Hindi",
      startDate: toDateString(new Date(2024, 0, 15)),
      releaseDate: toDateString(new Date(2025, 5, 15)),
      cast: ["Shah Rukh Khan", "Deepika Padukone", "Nawazuddin Siddiqui"],
    },
    {
      name: "Tales of Tomorrow",
      code: "TOT-S1",
      description: "A sci-fi anthology series exploring the future of humanity",
      type: "web_series" as const,
      stage: "production" as const,
      director: "Anurag Kashyap",
      producer: "Priya Sharma",
      budget: "150000000",
      spent: "80000000",
      progress: 55,
      genre: "Sci-Fi",
      language: "Hindi",
      startDate: toDateString(new Date(2024, 3, 1)),
      releaseDate: toDateString(new Date(2025, 8, 1)),
      cast: ["Radhika Apte", "Manoj Bajpayee"],
    },
    {
      name: "Royal Elegance",
      code: "RE-AD",
      description: "Luxury jewelry brand commercial",
      type: "commercial" as const,
      stage: "released" as const,
      director: "Zoya Akhtar",
      producer: "Rohan Mehta",
      budget: "5000000",
      spent: "4500000",
      progress: 100,
      genre: "Luxury",
      language: "English",
      startDate: toDateString(new Date(2024, 5, 1)),
      releaseDate: toDateString(new Date(2024, 8, 15)),
      cast: ["Alia Bhatt"],
    },
    {
      name: "Rhythm of Love",
      code: "ROL-MV",
      description: "Romantic music video for Arijit Singh",
      type: "music_video" as const,
      stage: "pre_production" as const,
      director: "Imtiaz Ali",
      producer: "Vikram Singh",
      budget: "8000000",
      spent: "1000000",
      progress: 25,
      genre: "Romance",
      language: "Hindi",
      startDate: toDateString(new Date(2024, 11, 1)),
      releaseDate: toDateString(new Date(2025, 2, 14)),
    },
  ];

  const createdProjects = await db.insert(schema.projects).values(projectsData).returning();

  // Create tasks
  const tasksData = [
    {
      title: "Final color grading for climax scene",
      description: "Complete the DI for the climax sequence",
      assigneeId: createdEmployees[3]?.id,
      status: "in_progress" as const,
      priority: "high" as const,
      projectId: createdProjects[0]?.id,
      dueDate: toDateString(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
      progress: 60,
    },
    {
      title: "VFX shots for chase sequence",
      description: "Render 45 VFX shots for the car chase",
      assigneeId: createdEmployees[5]?.id,
      status: "in_progress" as const,
      priority: "urgent" as const,
      projectId: createdProjects[0]?.id,
      dueDate: toDateString(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
      progress: 35,
    },
    {
      title: "Sound design episode 3",
      description: "Mix and master the audio for episode 3",
      assigneeId: createdEmployees[6]?.id,
      status: "review" as const,
      priority: "medium" as const,
      projectId: createdProjects[1]?.id,
      dueDate: toDateString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      progress: 90,
    },
    {
      title: "Marketing campaign strategy",
      description: "Develop digital marketing plan for launch",
      assigneeId: createdEmployees[7]?.id,
      status: "todo" as const,
      priority: "high" as const,
      projectId: createdProjects[0]?.id,
      dueDate: toDateString(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
      progress: 0,
    },
    {
      title: "Script review - Episode 5",
      description: "Review and finalize the script for ep 5",
      assigneeId: createdEmployees[4]?.id,
      status: "done" as const,
      priority: "medium" as const,
      projectId: createdProjects[1]?.id,
      dueDate: toDateString(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
      progress: 100,
    },
    {
      title: "Location scouting - Goa schedule",
      description: "Find suitable locations for Goa shoot",
      assigneeId: createdEmployees[8]?.id,
      status: "in_progress" as const,
      priority: "high" as const,
      projectId: createdProjects[3]?.id,
      dueDate: toDateString(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
      progress: 45,
    },
  ];

  await db.insert(schema.tasks).values(tasksData);

  // Create leaves
  const leavesData = [
    {
      employeeId: createdEmployees[3]?.id,
      type: "casual" as const,
      startDate: toDateString(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
      endDate: toDateString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      totalDays: "3",
      reason: "Family function",
      status: "pending" as const,
    },
    {
      employeeId: createdEmployees[4]?.id,
      type: "sick" as const,
      startDate: toDateString(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
      endDate: toDateString(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
      totalDays: "2",
      reason: "Fever and cold",
      status: "approved" as const,
    },
    {
      employeeId: createdEmployees[5]?.id,
      type: "earned" as const,
      startDate: toDateString(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
      endDate: toDateString(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
      totalDays: "6",
      reason: "Vacation to Europe",
      status: "pending" as const,
    },
  ];

  await db.insert(schema.leaves).values(leavesData);

  // Create expenses
  const expensesData = [
    {
      employeeId: createdEmployees[3]?.id,
      title: "Camera lens rental",
      category: "Equipment",
      amount: "45000",
      expenseDate: toDateString(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
      status: "pending" as const,
      projectId: createdProjects[0]?.id,
    },
    {
      employeeId: createdEmployees[7]?.id,
      title: "Client dinner",
      category: "Entertainment",
      amount: "12500",
      expenseDate: toDateString(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
      status: "approved" as const,
    },
    {
      employeeId: createdEmployees[8]?.id,
      title: "Location scouting travel",
      category: "Travel",
      amount: "8500",
      expenseDate: toDateString(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
      status: "pending" as const,
      projectId: createdProjects[3]?.id,
    },
  ];

  await db.insert(schema.expenses).values(expensesData);

  // Create notices
  await db.insert(schema.notices).values([
    {
      title: "New Production Studio Inauguration",
      content: "We are thrilled to announce the opening of our state-of-the-art production studio in Andheri West. Join us for the inauguration ceremony on December 15th at 10 AM.",
      type: "announcement" as const,
      priority: "high",
      isPinned: true,
    },
    {
      title: "Diwali Celebration & Office Closure",
      content: "The office will remain closed on November 1st for Diwali celebrations. The team celebration event will be held on October 31st at 4 PM.",
      type: "event" as const,
      priority: "normal",
      isPinned: false,
    },
    {
      title: "Updated Leave Policy",
      content: "Please review the updated leave policy effective from next month. New provisions include work-from-home days and flexible timing options.",
      type: "policy" as const,
      priority: "high",
      isPinned: false,
    },
  ]);

  // Create visitors
  await db.insert(schema.visitors).values([
    {
      name: "Shah Rukh Khan",
      phone: "+91 98765 43210",
      company: "Red Chillies Entertainment",
      purpose: "Script discussion",
      hostId: createdEmployees[0]?.id,
      status: "checked_in" as const,
      checkIn: new Date(Date.now() - 2 * 60 * 60 * 1000),
      badgeNumber: "V001",
    },
    {
      name: "Alia Bhatt",
      phone: "+91 98765 43211",
      company: "Eternal Sunshine Productions",
      purpose: "Commercial shoot",
      hostId: createdEmployees[2]?.id,
      status: "expected" as const,
      expectedAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
      badgeNumber: "V002",
    },
  ]);

  // Create daily work reports
  const reportsData = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    for (let j = 0; j < 3; j++) {
      reportsData.push({
        employeeId: createdEmployees[j]?.id,
        date: toDateString(date),
        tasksCompleted: "Completed VFX rendering for scene 4. Reviewed color grading with director.",
        tasksPlanned: "Continue VFX work on scene 5. Meeting with sound designer.",
        blockers: "Waiting for additional render nodes",
        hoursWorked: (7 + Math.random() * 2).toFixed(2),
        productivityScore: 70 + Math.floor(Math.random() * 30),
      });
    }
  }
  await db.insert(schema.dailyWorkReports).values(reportsData);

  // Create assets
  await db.insert(schema.assets).values([
    {
      name: "Midnight in Mumbai - Official Poster",
      description: "Main theatrical poster",
      type: "poster" as const,
      projectId: createdProjects[0]?.id,
      fileUrl: "/assets/poster1.jpg",
      fileSize: 2500000,
      mimeType: "image/jpeg",
      width: 2000,
      height: 3000,
      version: 1,
      approvalStatus: "approved" as const,
      tags: ["poster", "theatrical", "main"],
      categories: ["Marketing"],
      downloads: 150,
      views: 1200,
    },
    {
      name: "Midnight in Mumbai - Teaser Trailer",
      description: "30 second teaser",
      type: "trailer" as const,
      projectId: createdProjects[0]?.id,
      fileUrl: "/assets/trailer1.mp4",
      fileSize: 150000000,
      mimeType: "video/mp4",
      duration: 30,
      version: 3,
      approvalStatus: "approved" as const,
      tags: ["trailer", "teaser"],
      categories: ["Marketing"],
      downloads: 5000,
      views: 25000,
    },
    {
      name: "Tales of Tomorrow - Episode 1 Script",
      description: "Final shooting script",
      type: "script" as const,
      projectId: createdProjects[1]?.id,
      fileUrl: "/assets/script1.pdf",
      fileSize: 850000,
      mimeType: "application/pdf",
      version: 12,
      approvalStatus: "approved" as const,
      tags: ["script", "shooting"],
      categories: ["Pre-Production"],
      downloads: 45,
      views: 180,
    },
    {
      name: "Royal Elegance - Final Cut",
      description: "60 second commercial",
      type: "video" as const,
      projectId: createdProjects[2]?.id,
      fileUrl: "/assets/commercial1.mp4",
      fileSize: 85000000,
      mimeType: "video/mp4",
      duration: 60,
      version: 1,
      approvalStatus: "approved" as const,
      tags: ["commercial", "final"],
      categories: ["Deliverables"],
      downloads: 250,
      views: 5000,
    },
  ]);

  // Create roles
  await db.insert(schema.roles).values([
    { name: "Super Admin", description: "Full system access", permissions: ["*"], isSystem: true },
    { name: "Admin", description: "Administrative access", permissions: ["manage_users", "manage_payroll", "view_reports"], isSystem: true },
    { name: "HR", description: "Human resources access", permissions: ["manage_employees", "manage_attendance", "manage_leaves"], isSystem: true },
    { name: "Manager", description: "Team management", permissions: ["view_team", "approve_leaves", "assign_tasks"], isSystem: true },
    { name: "Employee", description: "Standard employee", permissions: ["view_own", "submit_attendance", "request_leave"], isSystem: true },
  ]);

  // Create notifications
  const notificationsData = [];
  for (const u of createdUsers.slice(0, 3)) {
    notificationsData.push(
      {
        userId: u.id,
        type: "attendance" as const,
        title: "Check-in successful",
        message: "You have successfully checked in for today",
        icon: "clock",
      },
      {
        userId: u.id,
        type: "task" as const,
        title: "New task assigned",
        message: "VFX shots for chase sequence has been assigned to you",
        icon: "check-square",
      },
      {
        userId: u.id,
        type: "announcement" as const,
        title: "New Production Studio",
        message: "Join us for the inauguration ceremony on December 15th",
        icon: "megaphone",
      }
    );
  }
  await db.insert(schema.notifications).values(notificationsData);

  // Create settings
  await db.insert(schema.settings).values([
    { key: "company_name", value: { value: "Four Dee Motion Pictures" }, category: "general" },
    { key: "working_hours", value: { start: "09:00", end: "18:00" }, category: "attendance" },
    { key: "late_threshold_minutes", value: { value: 15 }, category: "attendance" },
    { key: "overtime_rate", value: { value: 1.5 }, category: "payroll" },
  ]);

  return { seeded: true, message: "Database seeded successfully" };
}
