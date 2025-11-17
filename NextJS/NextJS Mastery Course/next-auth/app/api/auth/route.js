import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { register } from "@/app/controllers/authController";

// register route
export async function POST(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("signup")) {
      return register(req);
    }
  } catch (error) {
    console.log(error);
  }
}
