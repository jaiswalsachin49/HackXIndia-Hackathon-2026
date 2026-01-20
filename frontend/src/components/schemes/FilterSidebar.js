import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function FilterSidebar({ onFilterChange }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMinistries, setSelectedMinistries] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);

    const ministries = ["Ministry of Agriculture", "Ministry of Health", "Ministry of Housing", "Ministry of Finance", "Ministry of Education", "Ministry of Social Welfare"];
    const benefits = ["Financial Assistance", "Subsidies", "Insurance / Health", "Pension"];

    // Simulate search loading effect
    useEffect(() => {
        if (searchQuery) {
            setIsSearching(true);
            const timer = setTimeout(() => setIsSearching(false), 800);
            return () => clearTimeout(timer);
        }
    }, [searchQuery]);

    const handleMinistryToggle = (ministry) => {
        const updated = selectedMinistries.includes(ministry)
            ? selectedMinistries.filter(m => m !== ministry)
            : [...selectedMinistries, ministry];
        setSelectedMinistries(updated);
        onFilterChange?.({ ministries: updated, benefits: selectedBenefits, search: searchQuery });
    };

    const handleBenefitToggle = (benefit) => {
        const updated = selectedBenefits.includes(benefit)
            ? selectedBenefits.filter(b => b !== benefit)
            : [...selectedBenefits, benefit];
        setSelectedBenefits(updated);
        onFilterChange?.({ ministries: selectedMinistries, benefits: updated, search: searchQuery });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        onFilterChange?.({ ministries: selectedMinistries, benefits: selectedBenefits, search: e.target.value });
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedMinistries([]);
        setSelectedBenefits([]);
        onFilterChange?.({ ministries: [], benefits: [], search: "" });
    };

    return (
        <aside className="w-72 border-r border-slate-100 p-6 hidden lg:block bg-[#FDFDFC] h-[calc(100vh-80px)] sticky top-20 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-8 text-[#2F5233]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <span className="font-bold text-sm uppercase tracking-wider">Filters</span>
            </div>

            <div className="mb-8 relative group">
                {/* Search Box with Moving Light Effect */}
                <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${isSearching ? "border-[#2F5233] ring-1 ring-[#2F5233]/20 shadow-md" : "border-slate-200 focus-within:border-slate-400"}`}>

                    {/* Moving Light Gradient Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 pointer-events-none transition-transform duration-1000 ease-in-out ${isSearching ? "animate-[shimmer_1.5s_infinite]" : "translate-x-[-100%]"}`}
                        style={{ width: "200%" }}
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search schemes..."
                        className="w-full text-sm placeholder:text-slate-400 px-10 py-3 bg-white focus:outline-none relative z-0"
                    />
                    <Search className={`w-4 h-4 absolute left-3 top-3.5 transition-colors ${isSearching ? "text-[#2F5233]" : "text-slate-400"}`} />

                    {isSearching && (
                        <div className="absolute right-3 top-3.5">
                            <div className="w-1.5 h-1.5 bg-[#2F5233] rounded-full animate-ping" />
                        </div>
                    )}
                </div>
                <style jsx>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-150%); }
                        100% { transform: translateX(150%); }
                    }
                `}</style>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ministry</h4>
                    <ul className="space-y-3">
                        {ministries.map(m => (
                            <li key={m} className="flex items-center gap-3 group cursor-pointer" onClick={() => handleMinistryToggle(m)}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMinistries.includes(m) ? "bg-[#2F5233] border-[#2F5233]" : "border-slate-300 group-hover:border-[#2F5233]"}`}>
                                    {selectedMinistries.includes(m) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm transition-colors ${selectedMinistries.includes(m) ? "text-slate-900 font-medium" : "text-slate-500 group-hover:text-slate-700"}`}>{m.replace("Ministry of ", "")}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full h-px bg-slate-100" />

                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Benefit Type</h4>
                    <ul className="space-y-3">
                        {benefits.map(b => (
                            <li key={b} className="flex items-center gap-3 group cursor-pointer" onClick={() => handleBenefitToggle(b)}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBenefits.includes(b) ? "bg-[#2F5233] border-[#2F5233]" : "border-slate-300 group-hover:border-[#2F5233]"}`}>
                                    {selectedBenefits.includes(b) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm transition-colors ${selectedBenefits.includes(b) ? "text-slate-900 font-medium" : "text-slate-500 group-hover:text-slate-700"}`}>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button
                onClick={handleReset}
                className="w-full mt-10 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
                Clear Filters
            </button>
        </aside>
    );
}
