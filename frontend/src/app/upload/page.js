"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, FileUp, Shield, Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Dropzone from "../../components/upload/Dropzone";
import InfoSection from "../../components/upload/InfoSection";
import LoginRequiredModal from "../../components/LoginRequiredModal";
import Toast from "../../components/Toast";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    const token = localStorage.getItem("cs_token");
    if (!token) setShowLoginModal(true);
  }, []);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90; // Hold at 90% until response
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 500);

    try {
      const res = await fetch(`${API_BASE}/api/v1/upload-notice`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      clearInterval(progressInterval);
      setProgress(100);

      // Delay navigation slightly to show 100%
      setTimeout(() => {
        localStorage.setItem('noticeResult', JSON.stringify(data));
        localStorage.setItem('uploadedFile', file.name);
        window.location.href = '/results';
      }, 500);

    } catch (e) {
      console.error(e);
      clearInterval(progressInterval);
      setToast({ message: 'Error processing your document. Please try again.', type: 'error' });
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-green-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <Header />

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-20 px-6">

        {/* Navigation Back */}
        <div className="w-full max-w-4xl mb-8 flex items-center">
          <Link href="/" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#2F5233] transition-colors">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#2F5233] transition-colors shadow-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Dashboard
          </Link>
        </div>

        {/* Glass Card Container */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-200/50 rounded-3xl p-12 md:p-16 relative overflow-hidden">

          {/* Top Shine Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2F5233]/20 to-transparent"></div>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* Left Column: Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F5233]/10 text-[#2F5233] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#2F5233]/10">
                  <FileUp className="w-3 h-3" />
                  Document Parser
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  Interpret <br /> <span className="text-[#2F5233]">Legal Notices</span>
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Upload official government documents, legal notices, or circulars. Our AI will analyze the content, verify its authenticity, and provide a simplified explanation in seconds.
                </p>
              </div>

              <InfoSection />
            </div>

            {/* Right Column: Upload Action */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative">
              {/* Private Mode Toggle */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setPrivateMode(!privateMode)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${privateMode
                    ? "bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-slate-900/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                    }`}
                >
                  {privateMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {privateMode ? "Private Mode On" : "Private Mode Off"}
                </button>
              </div>

              <Dropzone onFileSelect={setFile} file={file} isPrivate={privateMode} />

              {!loading ? (
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className={`w-full mt-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${file
                    ? "bg-[#2F5233] text-white shadow-lg shadow-[#2F5233]/30 hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#244026]"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    }`}
                >
                  Analyze Document
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <div className="w-full mt-6 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                  <div className="relative w-48 h-24 overflow-hidden mb-2">
                    {/* Speedometer SVG */}
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      {/* Background Arc */}
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
                      {/* Foreground Arc - Dynamic Stroke Dasharray */}
                      {/* Circumference of semi-circle (r=40) is pi * r = 125.66 */}
                      <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#2F5233"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(progress / 100) * 125.66} 125.66`}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    {/* Percentage Text */}
                    <div className="absolute bottom-0 left-0 right-0 text-center">
                      <span className="text-3xl font-bold text-[#2F5233]">{progress}%</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    Processing Document...
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                {privateMode ? (
                  <div className="flex items-center gap-2 text-slate-600 animate-pulse">
                    <Shield className="w-3 h-3 text-slate-900" />
                    <span className="font-bold">Masking Personal Data</span>
                  </div>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#2F5233]">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    End-to-End Encrypted Upload
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-slate-400 font-medium opacity-60">
          © 2026 CivicSense AI. All rights reserved.
        </p>

      </main>

      <LoginRequiredModal isOpen={showLoginModal} onClose={() => { }} />
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, message: '' })}
      />
    </div>
  );
}
