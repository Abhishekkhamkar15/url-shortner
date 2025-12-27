import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const { shorturl } = params;

  try {
    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl });

    if (!doc?.url) {
      redirect("/");
    }

    // ✅ ENSURE VALID URL
    let targetUrl = doc.url;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    redirect(targetUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    redirect("/");
  }
}
