import db  from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PUT handler
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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
        date: body.date,
        notes: body.notes,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Error updating record:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    return new NextResponse("Internal Error", { status: 500 });
  }
} 