import { NextRequest, NextResponse } from "next/server";
import mime from "mime-types";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uuid = formData.get("uuid") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!uuid) {
      return NextResponse.json({ error: "Missing UUID" }, { status: 400 });
    }

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Detect extension
    const format = mime.extension(file.type) || "jpg";
    const publicId = `${uuid}.${format}`;

    // Upload to Cloudinary
    const uploadRes = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "user_profiles",
              public_id: publicId,
              overwrite: true,
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );
    console.log("************************************************");
    console.log("uploadRes", uploadRes.secure_url);
    console.log("************************************************");

    return NextResponse.json({ url: uploadRes.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
