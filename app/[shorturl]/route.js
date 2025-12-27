import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    // ✅ SAFETY CHECK
    if (!params || !params.shorturl) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    const shorturl = params.shorturl.toString().trim().toLowerCase();

    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl });

    if (!doc || !doc.url) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    // ✅ ENSURE VALID URL
    let target = doc.url.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }

    return new Response(null, {
      status: 302,
      headers: { Location: target },
    });
  } catch (error) {
    console.error("Redirect route error:", error);
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
