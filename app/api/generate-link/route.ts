import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getBaseUrl(req: Request): string {
  // Use env var if explicitly set (e.g. for custom domains)
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, ""); // strip trailing slash

  // Derive from request (works for both localhost and hosted)
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  try {
    // Create a new user with a temporary UUID
    const newUser = await prisma.user.create({
      data: {
        email: `temp-${Date.now()}@temp.com`, // Temporary email
        name: "Temporary User",
        password: "temp-password", // Will be updated during signup
        role: "client",
      },
    });

    // Generate the signup link with dynamic base URL
    const baseUrl = getBaseUrl(req);
    const signupLink = `${baseUrl}/signup/${newUser.id}`;

    return NextResponse.json({
      success: true,
      link: signupLink,
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Error generating link:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate link" },
      { status: 500 },
    );
  }
}
