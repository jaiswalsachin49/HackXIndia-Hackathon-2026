"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen bg-[#FAFAFA] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col font-sans text-slate-900">
            {/* Top Left Logo */}
            <div className="p-8">
                <div className="flex items-center gap-2">
                    <svg className="w-8 h-8 text-[#2F5233]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <span className="text-xl font-medium tracking-tight">Civic sense</span>
                </div>
            </div>

            <main className="flex-grow flex flex-col items-center justify-center px-4 -mt-20">
                <h1 className="text-[3.5rem] leading-none mb-4 font-serif text-slate-900 text-center">
                    Collect your thoughts<br />
                    with <span className="font-bold text-[#2F5233]">Civic sense</span>
                </h1>

                <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 mt-12 border border-slate-200 shadow-sm">
                    <div className="text-center mb-6 text-slate-500 text-sm">
                        Start using Civic sense for yourself or your team
                    </div>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] transition-all placeholder:text-slate-400"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full mt-4 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] transition-all placeholder:text-slate-400"
                    />

                    <button className="w-full mt-4 bg-[#2F5233] hover:bg-[#233d26] text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm">
                        Sign in
                    </button>

                    <p className="mt-6 text-[11px] text-slate-400 text-center leading-relaxed">
                        By continuing, you agree to Anthropic's Consumer Terms and Usage Policy, and acknowledge their Privacy Policy.
                    </p>

                    <p className="mt-4 text-sm text-slate-600 text-center">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-[#2F5233] font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>



            </main>
        </div>
    );
}
