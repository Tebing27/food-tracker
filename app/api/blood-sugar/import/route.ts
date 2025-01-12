import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { BloodSugarRecord } from "@/types";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { records } = body as { records: BloodSugarRecord[] };

    // Simpan semua record yang diimpor
    for (const record of records) {
      await prisma.bloodSugarRecord.create({
        data: {
          ...record,
          userId
        }
      });
    }

    // Ambil data terbaru
    const updatedRecords = await prisma.bloodSugarRecord.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(updatedRecords);
  } catch (error) {
    console.error("[BLOOD_SUGAR_IMPORT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 