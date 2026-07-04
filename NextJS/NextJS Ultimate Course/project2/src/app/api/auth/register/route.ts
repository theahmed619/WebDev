import connectDb from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    await connectDb();

    let existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        {
          message: "User alredy exist",
        },
        {
          status: 400,
        }
      );
    }
    if (password.lenght < 6) {
      return NextResponse.json(
        { message: "password must be  at least 6 character" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `register error ${error}` },
      { status: 500 }
    );
  }
}
