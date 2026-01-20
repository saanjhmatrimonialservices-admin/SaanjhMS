import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword, setAuthCookie } from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const body = await request.json();
    const { uuid } = await params;

    // Check if user exists with this UUID
    const existingUser = await prisma.user.findUnique({
      where: { id: uuid },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "Invalid signup link" },
        { status: 404 }
      );
    }

    // Check if user already has a client profile (already signed up)
    const existingClient = await prisma.client.findUnique({
      where: { userId: uuid },
    });

    if (existingClient) {
      return NextResponse.json(
        { success: false, error: "User already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(body.password);

    // Update user with new details
    const updatedUser = await prisma.user.update({
      where: { id: uuid },
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });

    // Create client profile
    const client = await prisma.client.create({
      data: {
        userId: uuid,
        dateOfBirth: new Date(body.dateOfBirth),
        gender: body.gender,
        timeOfBirth: body.timeOfBirth || null,
        placeOfBirth: body.placeOfBirth || null,
        rashi: body.rashi || null,
        height: body.height || null,
        weight: body.weight ? parseInt(body.weight) : null,
        maritalStatus: body.maritalStatus,
        complexion: body.complexion || null,
        diet: body.diet,
        drink: body.drink || false,
        smoke: body.smoke || false,
        hobbies: body.hobbies
          ? body.hobbies.split(",").map((h: string) => h.trim())
          : [],
        religion: body.religion,
        motherTongue: body.motherTongue || null,
        caste: body.caste || null,
        subCaste: body.subCaste || null,
        gotra: body.gotra || null,
        manglik: body.manglik || false,
        education: body.education || null,
        collegeName: body.collegeName || null,
        collegeYear: body.collegeYear ? parseInt(body.collegeYear) : null,
        schoolName: body.schoolName || null,
        schoolYear: body.schoolYear ? parseInt(body.schoolYear) : null,
        otherDegree: body.otherDegree || null,
        otherOrg: body.otherOrg || null,
        otherYear: body.otherYear ? parseInt(body.otherYear) : null,
        employedIn: body.employedIn || null,
        workingSince: body.workingSince ? parseInt(body.workingSince) : null,
        organization: body.organization || null,
        annualIncome: body.annualIncome || null,
        familyType: body.familyType || null,
        fatherName: body.fatherName || null,
        fatherOccupation: body.fatherOccupation || null,
        motherName: body.motherName || null,
        motherOccupation: body.motherOccupation || null,
        familyIncome: body.familyIncome || null,
        permanentAddress: body.permanentAddress || null,
        residentialAddress: body.residentialAddress || null,
        city: body.city || null,
        state: body.state || null,
        country: body.country || null,
        numberOfCars: body.numberOfCars ? parseInt(body.numberOfCars) : 0,
        numberOfBikes: body.numberOfBikes ? parseInt(body.numberOfBikes) : 0,
      },
    });

    // Create siblings if provided
    if (body.siblings && Array.isArray(body.siblings) && body.siblings.length > 0) {
      await prisma.sibling.createMany({
        data: body.siblings.map((sibling: {
          name: string;
          age: string;
          gender: string;
          profession?: string;
          maritalStatus?: string;
        }) => ({
          clientId: client.id,
          name: sibling.name,
          age: parseInt(sibling.age) || 0,
          gender: sibling.gender,
          profession: sibling.profession || null,
          maritalStatus: sibling.maritalStatus || null,
        })),
      });
    }

    // Set auth cookie for automatic login
    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      userId: uuid,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

    setAuthCookie(response, uuid);

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
