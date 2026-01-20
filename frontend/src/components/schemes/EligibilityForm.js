import { useState } from "react";

export default function EligibilityForm({ onCheck }) {
    const [form, setForm] = useState({
        age: "", gender: "Select", income: "Select Income Range", occupation: "Select Status", state: "Select Region", category: "Select Category"
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="bg-[#FAF9F5] border border-[#EBE8D8] rounded p-8 mb-10 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-3 text-xs font-bold uppercase tracking-widest border border-[#EBE8D8] text-slate-500 rounded-sm">
                Eligibility Form 10-A
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 pt-3">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Age</label>
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        type="number"
                        placeholder="Years"
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base focus:outline-none focus:border-slate-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
                    <select className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400">
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Annual Household Income (₹)</label>
                    <select
                        name="income"
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400"
                    >
                        <option value="0">Select Income Range</option>
                        <option value="100000">Below 1 Lakh</option>
                        <option value="300000">1 Lakh - 3 Lakhs</option>
                        <option value="500000">3 Lakhs - 5 Lakhs</option>
                        <option value="1000000">Above 5 Lakhs</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">State / Union Territory</label>
                    <select className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400">
                        <option>Select Region</option>
                        <option>Delhi</option>
                        <option>Maharashtra</option>
                        <option>Karnataka</option>
                    </select>
                </div>

                <div className="md:col-span-2 flex items-end justify-between">
                    <div className="flex-grow mr-6">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Occupation / Status</label>
                        <select className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400">
                            <option>Select Status</option>
                            <option>Unemployed</option>
                            <option>Student</option>
                            <option>Farmer</option>
                            <option>Salaried</option>
                        </select>
                    </div>

                    <button
                        onClick={() => onCheck(form)}
                        className="bg-[#008000] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wide hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap h-[46px]"
                    >
                        Check Eligibility
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
                Data is processed locally for privacy.
            </div>
        </div>
    );
}
