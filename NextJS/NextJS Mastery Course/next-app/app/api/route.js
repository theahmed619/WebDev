import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({ message: "Welcome to next.js backend" , success:true});
}

