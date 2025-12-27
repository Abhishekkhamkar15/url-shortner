import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  // ✅ NORMALIZE SHORT URL
  const shorturl = params.shorturl.trim().toLowerCase();

  try {
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

    // ✅ FORCE ABSOLUTE URL
    let target = doc.url.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }

    // ✅ RAW HTTP REDIRECT
    return new Response(null, {
      status: 302,
      headers: { Location: target },
    });
  } catch (err) {
    console.error("Redirect failed:", err);
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
