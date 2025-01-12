import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    id: string;
  };
}

// GET handler
export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const record = await db.bloodSugarRecord.findUnique({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    if (!record) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching record:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// PUT handler
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const updatedRecord = await db.bloodSugarRecord.update({
      where: {
        id: params.id,
        userId: userId,
      },
      data: {
        bloodSugar: parseFloat(body.bloodSugar),
        date: new Date(body.date).toISOString(),
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Error updating record:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// DELETE handler
export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.bloodSugarRecord.delete({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting record:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 