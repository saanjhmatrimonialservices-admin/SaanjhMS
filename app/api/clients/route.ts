import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromCookie } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const user = await getUserFromCookie();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";

    // Build where clause for filtering
    const where: any = {};
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { education: { contains: search, mode: "insensitive" } },
        { motherTongue: { contains: search, mode: "insensitive" } },
        { caste: { contains: search, mode: "insensitive" } },
        { religion: { contains: search, mode: "insensitive" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * pageSize;

    // Build orderBy clause
    let orderBy: any = {};
    if (sortBy === "name") {
      orderBy = { user: { name: sortOrder } };
    } else if (sortBy === "age") {
      orderBy = { dateOfBirth: sortOrder === "asc" ? "desc" : "asc" }; // Reverse for age
    } else if (sortBy === "createdAt") {
      orderBy = { user: { createdAt: sortOrder } };
    } else {
      orderBy = { [sortBy]: sortOrder };
    }

    // Fetch clients with user relation
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
            },
          },
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.client.count({ where }),
    ]);

    // Calculate age for each client
    const clientsWithAge = clients.map((client) => {
      const today = new Date();
      const birthDate = new Date(client.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return {
        ...client,
        age,
      };
    });

    return NextResponse.json({
      clients: clientsWithAge,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
