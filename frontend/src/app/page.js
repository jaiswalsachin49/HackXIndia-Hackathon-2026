"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckShield, Scale, Translate } from "../components/Icons";

export default function Home() {
  const router = useRouter();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Documents & Notices";

  useEffect(() => {
    let timeout;

    const handleTyping = () => {
      setTypedText(current => {
        // Typing forward
        if (!isDeleting && current.length < fullText.length) {
          return fullText.slice(0, current.length + 1);
        }
        // Finished typing, pause then start deleting
        if (!isDeleting && current.length === fullText.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
          return current;
        }
        // Deleting backward
        if (isDeleting && current.length > 0) {
          return fullText.slice(0, current.length - 1);
        }
        // Finished deleting, start typing again
        if (isDeleting && current.length === 0) {
          setIsDeleting(false);
          return "";
        }
        return current;
      });
    };

    const typingInterval = setInterval(handleTyping, isDeleting ? 50 : 100);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeout);
    };
  }, [isDeleting]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="bg-[#1c2e36] text-white text-xs py-2 px-6 flex justify-between items-center tracking-wide">
        <div className="flex gap-4">
          <span className="bg-[#2F5233] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Latest</span>
          <span className="opacity-90 max-w-md truncate hidden sm:block">Digital Personal Data Protection Act summary now in Hindi</span>
        </div>
        <div className="flex gap-6 opacity-70">
          <span>About</span>
          <span>Schemes</span>
          <span>Help</span>
          <span className="flex items-center gap-1"><span className="text-[10px]">文A</span> Hinglish</span>
        </div>
      </div>

      <main className="flex-grow bg-[#FAFAFA] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <section className="pt-20 pb-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-block bg-[#E8E6D9] text-[#5C5C4D] text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-8">
            Citizen Intelligence Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight mb-2">
            Demystifying Government
          </h1>
          <h2 className="text-5xl md:text-6xl font-serif italic text-[#2F5233] min-h-[72px]">
            {typedText}<span className="animate-pulse">|</span>
          </h2>

          <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            CivicSense AI serves as your personal civic interpreter. We translate complex bureaucratic language into clear Hinglish, empowering every citizen with instant understanding.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/upload")}
              className="bg-[#2F5233] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#233d26] transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Analyze a Notice
            </button>
            <button
              onClick={() => router.push("/schemes")}
              className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded text-sm font-medium hover:border-slate-300 transition-colors shadow-sm"
            >
              Find Schemes
            </button>
          </div>
        </section>

        <div className="relative h-48 w-full max-w-3xl mx-auto opacity-50 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border-2 border-dashed border-slate-400 rounded-full animate-[spin_120s_linear_infinite]"></div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] border-2 border-dashed border-slate-500 rounded-full animate-[spin_100s_linear_infinite]"></div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[400px] h-[400px] border-2 border-dashed border-slate-600 rounded-full animate-[spin_80s_linear_infinite]"></div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 text-[10px] font-bold tracking-widest text-slate-700 z-10">PRIVATE & SECURE</div>
        </div>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex justify-between items-end border-b border-slate-200 pb-4 mb-8">
            <h3 className="font-bold text-slate-900 tracking-tight text-lg">PLATFORM CAPABILITIES</h3>
            <span className="text-xs text-slate-400">Updated for 2024 Regulations</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm hover:shadow-md transition-shadow relative z-10">
              <div className="w-12 h-12 rounded-full border border-slate-100 grid place-items-center mb-6 text-slate-800">
                <CheckShield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Citizen Privacy First</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Strict data isolation protocols ensure your documents are processed in real-time and immediately purged. No retention, no sharing.
              </p>
            </div>

            <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full border border-slate-100 grid place-items-center mb-6 text-slate-800">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Legal Precision AI</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Models fine-tuned on the Indian Constitution and Gazette notifications to ensure high-fidelity interpretation of bureaucratic text.
              </p>
            </div>

            <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full border border-slate-100 grid place-items-center mb-6 text-slate-800">
                <Translate className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Vernacular Clarity</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Breaking language barriers with instant Hinglish summaries. Understand the "why" and "how" without the legalese.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-[#FAF9F5] border border-[#EBE8D8] rounded p-4 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#4B5563] mt-0.5 flex-shrink-0">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700">Official Disclaimer:</span> CivicSense AI is an assistive technology platform for informational purposes. For binding legal advice, please consult a registered practitioner.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
