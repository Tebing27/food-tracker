import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bloodSugarRecords = await db.bloodSugarRecord.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(bloodSugarRecords || []);
    
  } catch (error) {
    console.error('Error fetching blood sugar data:', error instanceof Error ? error.message : 'Unknown error');
    
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 