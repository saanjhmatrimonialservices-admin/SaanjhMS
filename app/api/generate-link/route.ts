import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
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

    // Generate the signup link
    const signupLink = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/signup/${newUser.id}`;

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
