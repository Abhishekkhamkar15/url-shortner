import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const { shorturl } = params;

  try {
    const client = await clientPromise;
    const db = client.db("Shrink");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl });

    if (doc?.url) {
      redirect(doc.url); // redirect to original URL
    } else {
      redirect(process.env.NEXT_PUBLIC_HOST || "/"); // fallback
    }

  } catch (error) {
    console.error("Redirect error:", error);
    redirect(process.env.NEXT_PUBLIC_HOST || "/");
  }
}
