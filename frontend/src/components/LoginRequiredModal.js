"use client";

import { useRouter } from "next/navigation";

export default function LoginRequiredModal({ isOpen, onClose }) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center transform transition-all scale-100">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                    Authentication Required
                </h3>

                <p className="text-slate-500 mb-8">
                    You need to be logged in to access this feature. Please sign in to your account or create a new one.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => router.push("/")}
                        className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => router.push("/login")}
                        className="flex-1 px-4 py-2.5 bg-[#2F5233] text-white font-medium rounded-xl hover:bg-[#234a2e] transition-colors shadow-sm"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        </div>
    );
}
