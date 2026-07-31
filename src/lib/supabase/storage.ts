import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

const BUCKET_NAME = "fourdee-assets";

export async function uploadFile(
  bucket: string,
  filePath: string,
  file: File | Blob,
  options?: {
    contentType?: string;
    upsert?: boolean;
  }
): Promise<UploadResult> {
  const bucketName = bucket || BUCKET_NAME;
  const contentType = options?.contentType || file instanceof File ? file.type : "application/octet-stream";

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      contentType,
      upsert: options?.upsert || false,
    });

  if (error) {
    return { url: "", path: "", error: error.message };
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path,
  };
}

// Predefined upload helpers
export async function uploadProfilePhoto(userId: string, file: File) {
  const path = `profiles/${userId}/${Date.now()}-${file.name}`;
  return uploadFile("profiles", path, file);
}

export async function uploadAsset(
  projectId: string,
  type: string,
  file: File,
  version = 1
) {
  const path = `projects/${projectId}/${type}/${version}-${Date.now()}-${file.name}`;
  return uploadFile("assets", path, file);
}

export async function uploadDocument(category: string, file: File) {
  const path = `documents/${category}/${Date.now()}-${file.name}`;
  return uploadFile("documents", path, file);
}

export async function uploadExpenseReceipt(expenseId: string, file: File) {
  const path = `expenses/receipts/${expenseId}/${Date.now()}-${file.name}`;
  return uploadFile("expenses", path, file);
}

export async function uploadProjectMedia(projectId: string, type: string, file: File) {
  const path = `projects/${projectId}/${type}/${Date.now()}-${file.name}`;
  return uploadFile("assets", path, file);
}

// Get signed URL for protected files
export async function getSignedUrl(bucket: string, path: string, expiresIn = 3600) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(error.message);
  }

  return data.signedUrl;
}

// List files in a bucket/folder
export async function listFiles(bucket: string, path = "", options?: { limit?: number; sortBy?: { column: string; ascending: boolean } }) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path, options);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a file
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }
}
