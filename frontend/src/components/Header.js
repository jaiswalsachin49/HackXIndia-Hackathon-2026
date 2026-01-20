"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="w-8 h-8 rounded bg-slate-900 grid place-items-center text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 leading-none">CivicSense AI</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider leading-none">Public Utility</div>
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                        <Link href="/upload" className="hover:text-slate-900 transition-colors">Upload</Link>
                        <Link href="/schemes" className="hover:text-slate-900 transition-colors">Schemes</Link>
                        <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
                        <Link href="/help" className="hover:text-slate-900 transition-colors">Help</Link>
                    </nav>

                    {/* Profile Link */}
                    <Link
                        href="/profile"
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors grid place-items-center text-slate-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
