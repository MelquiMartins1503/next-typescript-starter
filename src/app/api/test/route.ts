import { type NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prismaClient";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const userExists = await prismaClient.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userExists) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Hello, world!" });
}
