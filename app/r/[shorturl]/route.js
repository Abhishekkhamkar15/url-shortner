import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    if (!params?.shorturl) {
      return Response.redirect(new URL("/", request.url));
    }

    const shorturl = params.shorturl.trim().toLowerCase();

    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl });

    if (!doc?.url) {
      return Response.redirect(new URL("/", request.url));
    }

    let target = doc.url;
    if (!target.startsWith("http")) {
      target = "https://" + target;
    }

    return Response.redirect(target);
  } catch (err) {
    console.error("Redirect error:", err);
    return Response.redirect(new URL("/", request.url));
  }
}
