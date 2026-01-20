import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-slate-100 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <Link href="/" className="flex items-center gap-2 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="w-6 h-6 rounded bg-slate-900 grid place-items-center text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <span className="font-bold text-slate-900">CivicSense AI</span>
                </Link>

                <nav className="flex items-center gap-8 text-sm text-slate-500">
                    <Link href="/#" className="hover:text-slate-900">Privacy Policy</Link>
                    <Link href="/#" className="hover:text-slate-900">Terms of Service</Link>
                    <Link href="/#" className="hover:text-slate-900">Accessibility</Link>
                    <Link href="/help" className="hover:text-slate-900">Contact Us</Link>
                </nav>

                <div className="text-xs text-slate-400">
                    © 2024 CivicSense AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
