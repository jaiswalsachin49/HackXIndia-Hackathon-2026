"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Dropzone from "../../components/upload/Dropzone";
import InfoSection from "../../components/upload/InfoSection";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/v1/upload-notice`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-[#FAFAFA] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-12 md:p-16">

            {/* Card Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0F172A] mb-4">
                Upload Your Notice
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                Please upload the official government document you wish to interpret.
                Ensure the file is a clean scan for optimal accuracy.
              </p>
            </div>

            {/* Upload Area */}
            <div className="mb-10">
              <Dropzone onFileSelect={setFile} file={file} />
            </div>

            {/* Info Section */}
            <InfoSection />

            {/* Actions */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
              <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors border-b border-transparent hover:border-slate-800 pb-0.5">
                Cancel Upload
              </Link>

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide px-6 py-3 rounded transition-colors ${file && !loading
                  ? "bg-[#E2E8F0] text-slate-800 hover:bg-slate-300"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {loading ? "Processing..." : "Submit Document"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

          </div>

          {/* Disclaimer Footer */}
          <div className="mt-8 bg-[#FAF9F5] border border-[#EBE8D8] rounded p-4 text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-600">Official Disclaimer:</span> CivicSense AI provides automated summaries for informational purposes only. This is not a legal substitute for the original document. Please consult a qualified professional for binding interpretations.
            </p>
          </div>

          {/* Result Display (Temporary) */}
          {result && (
            <div className="mt-8 bg-white border border-[#2F5233] rounded p-6 shadow-md">
              <h3 className="font-bold text-[#2F5233] mb-2">Analysis Result</h3>
              <pre className="text-xs bg-slate-50 p-4 rounded overflow-auto max-h-60 text-slate-700">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
