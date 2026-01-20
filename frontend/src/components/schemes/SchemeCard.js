import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Bookmark } from "lucide-react";

export default function SchemeCard({ scheme }) {
    const router = useRouter();

    const handleViewDetails = () => {
        localStorage.setItem('currentScheme', JSON.stringify(scheme));
        const schemeId = scheme.name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/schemes/${schemeId}`);
    };

    // Smart banner selection logic
    const getBannerImage = () => {
        const text = (scheme.ministry + " " + scheme.name + " " + (scheme.tags?.join(" ") || "")).toLowerCase();

        if (text.includes("agriculture") || text.includes("farm") || text.includes("kisan") || text.includes("rural")) return "/images/scheme_banner_finance.png"; // Fallback to compatible generic
        if (text.includes("educat") || text.includes("school") || text.includes("scholarship") || text.includes("student")) return "/images/scheme_banner_education.png";
        if (text.includes("health") || text.includes("medic") || text.includes("ayushman") || text.includes("wellness")) return "/images/scheme_banner_health.png";
        if (text.includes("financ") || text.includes("money") || text.includes("loan") || text.includes("bank") || text.includes("pension")) return "/images/scheme_banner_finance.png";

        return "/images/scheme_banner_finance.png"; // Default generic premium banner
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Banner Image */}
            <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                <Image
                    src={getBannerImage()}
                    alt="Scheme Banner"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

                {/* Overlay Tags */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider bg-black/30 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                        {scheme.ministry || "Govt. of India"}
                    </span>
                    {scheme.official && (
                        <span className="bg-[#2F5233] text-white text-[9px] px-2 py-1 rounded flex items-center gap-1 font-bold uppercase tracking-wider shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                            Official
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#2F5233] transition-colors leading-tight">
                        {scheme.name}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {scheme.category && (
                        <span className="bg-[#2F5233]/10 text-[#2F5233] text-[10px] font-bold px-2 py-1 rounded-full border border-[#2F5233]/20">
                            {scheme.category}
                        </span>
                    )}
                    {scheme.benefits && (
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-medium px-2 py-1 rounded-full border border-blue-100">
                            Benefits Available
                        </span>
                    )}
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10">
                    {scheme.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[10px] text-slate-400 font-medium">Updated: {scheme.last_updated || "Recent"}</span>

                    <div className="flex gap-3">
                        <button className="p-2 text-slate-400 hover:text-[#2F5233] hover:bg-green-50 rounded-full transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleViewDetails}
                            className="flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#2F5233] transition-all group/btn"
                        >
                            View Details
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
