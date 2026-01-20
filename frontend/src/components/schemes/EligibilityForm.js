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
                        min="0"
                        max="120"
                        placeholder="Years"
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base focus:outline-none focus:border-slate-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400"
                    >
                        <option value="Select">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
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
                    <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400"
                    >
                        <option value="Select Region">Select Region</option>
                        <option value="All India">All India</option>
                        <optgroup label="States">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </optgroup>
                        <optgroup label="Union Territories">
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                        </optgroup>
                    </select>
                </div>

                <div className="md:col-span-2 flex items-end justify-between">
                    <div className="flex-grow mr-6">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Occupation / Status</label>
                        <select
                            name="occupation"
                            value={form.occupation}
                            onChange={handleChange}
                            className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-base text-slate-600 focus:outline-none focus:border-slate-400"
                        >
                            <option value="Select Status">Select Status</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Student">Student</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Salaried">Salaried</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Senior Citizen">Senior Citizen</option>
                        </select>
                    </div>

                    <button
                        onClick={() => onCheck(form)}
                        className="bg-[#3D5A3C] text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-[#2F4C2E] transition-colors shadow-lg whitespace-nowrap h-[46px]"
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
