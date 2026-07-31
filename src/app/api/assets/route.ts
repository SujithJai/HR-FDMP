import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { assets } from "@/db/schema";

const DEFAULT_ASSETS = [
  {
    id: "ast-1",
    assetCode: "AST-001",
    name: "Kaal_Official_Teaser_4K_Final.mp4",
    type: "Video",
    category: "Footage",
    size: "4.2 GB",
    format: "MP4 / ProRes 422",
    projectName: "Project Kaal",
    uploadedBy: "VFX Team",
    uploadDate: "2024-07-20",
    version: "v2.4",
  },
  {
    id: "ast-2",
    assetCode: "AST-002",
    name: "CyberCity_Poster_Main_8K.psd",
    type: "Image",
    category: "Branding / Poster",
    size: "850 MB",
    format: "PSD / TIFF",
    projectName: "Cyber City",
    uploadedBy: "Marketing Dept",
    uploadDate: "2024-07-18",
    version: "v1.0",
  },
  {
    id: "ast-3",
    assetCode: "AST-003",
    name: "Chola_Docu_BGM_Master_Stereo.wav",
    type: "Audio",
    category: "Soundtrack",
    size: "320 MB",
    format: "WAV 24-bit 96kHz",
    projectName: "The Legend of Chola",
    uploadedBy: "Sound Studio",
    uploadDate: "2024-07-12",
    version: "v3.1",
  },
];

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const dbAssets = await db.select().from(assets);
      if (dbAssets && dbAssets.length > 0) {
        return NextResponse.json({ success: true, data: dbAssets });
      }
    }
  } catch (err) {
    console.warn("DB assets fetch fallback:", err);
  }

  return NextResponse.json({ success: true, data: DEFAULT_ASSETS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAsset = {
      id: `ast-${Date.now()}`,
      assetCode: body.assetCode || `AST-${Math.floor(100 + Math.random() * 900)}`,
      name: body.name || "Untitled_Asset",
      type: body.type || "Document",
      category: body.category || "General",
      size: body.size || "12 MB",
      format: body.format || "RAW",
      projectName: body.projectName || "General Production",
      uploadedBy: body.uploadedBy || "System User",
      uploadDate: new Date().toISOString().split("T")[0],
      version: body.version || "v1.0",
    };

    if (process.env.DATABASE_URL) {
      try {
        await db.insert(assets).values({
          assetCode: newAsset.assetCode,
          name: newAsset.name,
          category: newAsset.category,
          status: "active",
        });
      } catch (dbErr) {
        console.warn("Could not insert asset into DB:", dbErr);
      }
    }

    return NextResponse.json({ success: true, data: newAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add asset" },
      { status: 500 }
    );
  }
}
