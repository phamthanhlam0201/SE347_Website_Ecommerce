import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Comment from "@/models/comment";
import Joi from "joi";
import { NextResponse } from "next/server";

const addcomment = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
  name: Joi.string().required(),
  cmt: Joi.string().required(),});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const {userID, productID, name, cmt} = data;

      const { error } = addcomment.validate({ userID, productID, name, cmt });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const saveComment = await Comment.create(data);

      console.log(saveComment);

      if (saveComment) {
        return NextResponse.json({
          success: true,
          message: "Comment is added to product !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to cart ! Please try again.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
