import Link from "next/link";
import { Translate } from "./Icons";

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-900 grid place-items-center text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                        </svg>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-lg text-slate-900 tracking-tight">CIVICSENSE</span>
                        <span className="text-[10px] font-medium text-slate-500 tracking-wider">PUBLIC UTILITY</span>
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
                    <Link href="/schemes" className="hover:text-slate-900 transition-colors">Schemes</Link>
                    <Link href="/help" className="hover:text-slate-900 transition-colors">Help</Link>
                    <div className="h-4 w-px bg-slate-200 mx-2"></div>
                    <button className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                        <Translate className="w-4 h-4" />
                        <span>Hinglish</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
