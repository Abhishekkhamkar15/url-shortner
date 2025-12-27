"use client";

import Link from "next/link";
import { useState } from "react";

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [shorturl, setShorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const [displayShort, setDisplayShort] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!url || !shorturl) {
      alert("Both URL and short text are required");
      return;
    }

    // ✅ AUTO-FIX URL
    let finalUrl = url.trim();
    if (
      !finalUrl.startsWith("http://") &&
      !finalUrl.startsWith("https://")
    ) {
      finalUrl = "https://" + finalUrl;
    }

    // ✅ NORMALIZE SHORT URL (CRITICAL)
    const cleanShort = shorturl.trim().toLowerCase();

    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          shorturl: cleanShort,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Failed to generate URL. Try again.");
        return;
      }

      const result = await res.json();

      // ✅ SAVE FOR UI (USE LOWERCASE)
      setGenerated(
        `${process.env.NEXT_PUBLIC_HOST}/r/${cleanShort}`
      );
      setDisplayShort(cleanShort);

      // clear inputs
      setUrl("");
      setShorturl("");

      alert(result.message);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg bg-amber-200 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Create your short URLs</h1>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={url}
          placeholder="Enter your URL (google.com is ok)"
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-2 bg-white rounded-md focus:outline-amber-600"
        />

        <input
          type="text"
          value={shorturl}
          placeholder="Enter preferred short text"
          onChange={(e) => setShorturl(e.target.value)}
          className="px-4 py-2 bg-white rounded-md focus:outline-amber-600"
        />

        <button
          onClick={generate}
          disabled={loading}
          className={`rounded-lg shadow-lg py-2 font-bold text-white ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* ✅ SHOW ONLY SHORT TEXT */}
      {generated && (
        <div className="mt-4">
          <span className="font-bold text-lg">Your Short Link</span>
          <code className="block mt-2 p-2 bg-white rounded-md">
            <Link
              href={generated}
              target="_blank"
              className="text-blue-600 underline"
            >
              {displayShort}
            </Link>
          </code>
        </div>
      )}
    </div>
  );
}
