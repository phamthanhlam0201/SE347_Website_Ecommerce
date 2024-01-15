import connectToDB from "@/database";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const getData = await Comment.find({})

    if (getData && getData.length) {
      return NextResponse.json({ success: true, data: getData });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Product found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
