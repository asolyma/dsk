import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const signedinPages = ["/", "/dashboard"];
export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.T_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/login");
    } else {
      const valid = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
      return;
    }
  }
}
