export default function FilterSidebar() {
    return (
        <aside className="w-64 border-r border-slate-100 p-6 hidden lg:block bg-[#FDFDFC]">
            <div className="flex items-center gap-2 mb-8 text-[#2F5233]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <span className="font-bold text-sm">Advanced Filters</span>
            </div>

            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search keywords..."
                    className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white focus:outline-none focus:border-slate-400"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 absolute right-3 top-2.5 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">By Ministry</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                        {["Ministry of Agriculture", "Ministry of Health", "Ministry of Housing", "Ministry of Finance"].map(m => (
                            <li key={m} className="flex items-center gap-2">
                                <input type="checkbox" className="rounded border-slate-300 text-[#2F5233] focus:ring-[#2F5233]" />
                                <span>{m}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Benefit Type</h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                        {["Financial Assistance", "Subsidies", "Insurance / Health", "Pension"].map(b => (
                            <li key={b} className="flex items-center gap-2">
                                <input type="checkbox" className="rounded border-slate-300 text-[#2F5233] focus:ring-[#2F5233]" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className="w-full mt-8 border border-slate-200 text-slate-700 text-xs font-semibold py-2 rounded hover:bg-slate-50 transition-colors">
                Reset Filters
            </button>
        </aside>
    );
}
