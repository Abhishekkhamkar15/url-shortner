import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // ❌ ignore static & known routes
  const blocked = [
    "/",
    "/shorten",
    "/about",
    "/contact",
    "/github",
    "/api",
    "/_next",
    "/favicon.ico",
  ];

  if (blocked.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // extract shorturl
  const shorturl = pathname.slice(1).trim().toLowerCase();
  if (!shorturl) return NextResponse.next();

  try {
    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl });

    if (!doc?.url) return NextResponse.next();

    let target = doc.url;
    if (!target.startsWith("http")) {
      target = "https://" + target;
    }

    return NextResponse.redirect(target);
  } catch {
    return NextResponse.next();
  }
}
