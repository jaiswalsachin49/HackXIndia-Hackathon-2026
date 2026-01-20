import { useRouter } from "next/navigation";

export default function SchemeCard({ scheme }) {
    const router = useRouter();

    const handleViewDetails = () => {
        // Save scheme to localStorage
        localStorage.setItem('currentScheme', JSON.stringify(scheme));
        // Navigate to detail page
        const schemeId = scheme.name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/schemes/${schemeId}`);
    };

    return (
        <div className="bg-white border border-slate-100 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-nowrap">{scheme.ministry || "Ministry of Social Welfare"}</span>
                    {scheme.official && (
                        <span className="bg-green-50 text-green-700 border border-green-100 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 font-bold uppercase tracking-wider">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                            Official Seal
                        </span>
                    )}
                </div>
                <span className="text-[10px] text-slate-300">Last Updated: {scheme.last_updated || "Nov 2023"}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{scheme.name}</h3>

            <div className="flex gap-2 mb-4">
                {scheme.tags?.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> {tag}
                    </span>
                ))}
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-3xl">
                {scheme.description}
            </p>

            <div className="flex items-center gap-6 text-xs font-bold text-slate-900 tracking-wide uppercase">
                <button
                    onClick={handleViewDetails}
                    className="flex items-center gap-1 hover:text-[#2F5233] transition-colors group"
                >
                    View Details
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
                <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    Save
                </button>
            </div>
        </div>
    );
}
