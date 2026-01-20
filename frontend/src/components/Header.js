"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Check login status
        const token = localStorage.getItem("cs_token");
        setIsLoggedIn(!!token);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
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

                        {/* Upload Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                                Uploads
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left z-50">
                                <Link href="/upload" className="block px-4 py-3 text-sm text-slate-600 hover:text-[#2F5233] hover:bg-slate-50 rounded-t-xl transition-colors">
                                    <div className="font-medium">Add New</div>
                                    <div className="text-xs text-slate-400 mt-0.5">Upload a new document</div>
                                </Link>
                                <div className="h-px bg-slate-50"></div>
                                <Link href="/history" className="block px-4 py-3 text-sm text-slate-600 hover:text-[#2F5233] hover:bg-slate-50 rounded-b-xl transition-colors">
                                    <div className="font-medium">History</div>
                                    <div className="text-xs text-slate-400 mt-0.5">View passed analysis</div>
                                </Link>
                            </div>
                        </div>
                        <Link href="/schemes" className="hover:text-slate-900 transition-colors">Schemes</Link>
                        <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
                        <Link href="/help" className="hover:text-slate-900 transition-colors">Help</Link>
                    </nav>

                    {isLoggedIn ? (
                        /* Profile Link */
                        <Link
                            href="/profile"
                            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors grid place-items-center text-slate-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="text-sm font-medium bg-[#2F5233] text-white px-4 py-2 rounded-lg hover:bg-[#234a2e] transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
