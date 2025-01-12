import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { records } = await request.json();

    const importedRecords = await db.bloodSugarRecord.createMany({
      data: records.map((record: any) => ({
        bloodSugar: parseFloat(record.bloodSugar),
        date: new Date(record.date).toISOString(),
        notes: record.notes || "",
        userId,
      })),
    });

    return NextResponse.json(importedRecords);
  } catch (error) {
    console.error("Error importing records:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 