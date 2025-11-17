import { NextResponse } from "next/server";
import User from "../models/User";

// user register

export const register = async (req) => {
  const { name, email, password } = await req.json();
  console.log("data from body",name)
  return NextResponse.json({
    message: "Getting data from body",
    data: name,
  });
};
