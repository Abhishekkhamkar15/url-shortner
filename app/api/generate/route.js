import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.url || !body.shorturl) {
      return Response.json(
        { success: false, message: "URL and shorturl required" },
        { status: 400 }
      );
    }

    // ✅ NORMALIZE SHORT URL
    const short = body.shorturl.trim().toLowerCase();

    // ✅ URL SHOULD ALREADY BE FIXED BY FRONTEND
    const finalUrl = body.url.trim();

    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    // ✅ CHECK DUPLICATE
    const existing = await collection.findOne({ shorturl: short });
    if (existing) {
      return Response.json(
        { success: false, message: "Short URL already exists!" },
        { status: 409 }
      );
    }

    // ✅ INSERT CLEAN DATA
    await collection.insertOne({
      url: finalUrl,
      shorturl: short,
      createdAt: new Date(),
    });

    return Response.json(
      { success: true, message: "URL Generated Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Generate API error:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
