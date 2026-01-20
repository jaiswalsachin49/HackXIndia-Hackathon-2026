"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(`${API_BASE}/api/v1/upload-notice`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Upload Government / Legal Notice
      </h2>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Analyze Notice"}
      </button>

      {result && (
        <div className="mt-8 bg-slate-900 p-6 rounded-lg space-y-4">
          <p><b>Notice Type:</b> {result.notice_type}</p>
          <p><b>Severity:</b> {result.severity}</p>
          <p><b>Explanation:</b> {result.explanation}</p>

          <div>
            <b>Suggested Schemes:</b>
            <ul className="list-disc ml-6">
              {result.scheme_suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
