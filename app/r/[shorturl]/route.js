import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    if (!params?.shorturl) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    const shorturl = params.shorturl.toLowerCase().trim();

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

    let target = doc.url.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }

    // ✅ FORCE BROWSER-LEVEL REDIRECT
    return new Response(null, {
      status: 302,
      headers: {
        Location: target,
      },
    });
  } catch (err) {
    console.error("Redirect error:", err);
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
