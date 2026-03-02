import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security, but for now let's be helpful or generic
      // "If an account with this email exists, we have sent an OTP."
      // But for development/UX, showing error might be preferred by some.
      // Standard practice: generic message.
      // However, if we need to verify OTP, we need a record.
      // If user doesn't exist, we can't save OTP.
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry,
      },
    });

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Saanjh Matrimony <onboarding@resend.dev>",
      to: [email],
      subject: "Your Password Reset OTP",
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
