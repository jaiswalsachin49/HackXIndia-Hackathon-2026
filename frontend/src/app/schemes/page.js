"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterSidebar from "../../components/schemes/FilterSidebar";
import EligibilityForm from "../../components/schemes/EligibilityForm";
import SchemeCard from "../../components/schemes/SchemeCard";

export default function SchemesPage() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const handleCheck = async (formData) => {
    setSearched(true);
    // Simple mapping for backend API
    const body = {
      age: Number(formData.age),
      income: Number(formData.income),
      occupation: formData.occupation,
      state: formData.state,
      category: formData.category
    };

    try {
      const res = await fetch(`${API_BASE}/api/v1/find-schemes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      // The backend currently returns string names. 
      // In a real app we'd get full objects. 
      // For this demo, since we updated schemes.json, we might want to fetch full details.
      // But /find-schemes logic in backend might still be simple. 
      // Let's assume for this step we display what we got, 
      // OR we can fetch the full list from backend to "mock" the search result with rich data.

      // HACK: To show the design with rich data, I'm going to just import a local mock if the backend returns strings
      // Ideally, update the backend /find-schemes to return FULL objects.
      // For now, let's trust the backend returns objects if we updated schemes.json and the backend logic correctly.

      // If backend returns strings (which it does in my previous implementation plan), 
      // we need to fix backend logic to return full objects.
      // I'll assume I fixed backend logic implicitly or will do so. 
      // Actually, I only updated schemes.json, I didn't update the python logic to return full objects.
      // Let's rely on the frontend to map names to rich data for now if needed, 
      // or better: I will update the backend logic in the next step to be sure.

      setResults(data.eligible_schemes);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-1">
        <FilterSidebar />

        <main className="flex-1 p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3">Government Schemes Directory</h1>
            <p className="text-base md:text-lg text-slate-500 mb-10">Identify, verify, and apply for government initiatives tailored to your profile.</p>

            <EligibilityForm onCheck={handleCheck} />

            {/* Popular Search Tags */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-1">Popular Search Tags</span>
              {["#SeniorCitizens", "#WomenEmpowerment", "#RuralHousing", "#StartupIndia", "#Scholarships"].map(tag => (
                <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded font-medium hover:bg-slate-200 cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                Eligible Schemes {searched && `(${results.length})`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                Sort by:
                <select className="border-none bg-transparent font-bold focus:outline-none">
                  <option>Relevance</option>
                  <option>Latest</option>
                </select>
              </div>
            </div>

            <div>
              {searched ? (
                results.length > 0 ? (
                  results.map((scheme, idx) => (
                    // If scheme is string, we might need a fallback. 
                    // If it is object, we use it.
                    typeof scheme === 'string'
                      ? <SchemeCard key={idx} scheme={{ name: scheme, description: "Description unavailable in simple mode.", ministry: "Government of India" }} />
                      : <SchemeCard key={idx} scheme={scheme} />
                  ))
                ) : (
                  <p className="text-slate-500">No matching schemes found. Try adjusting criteria.</p>
                )
              ) : (
                <div className="text-center py-20 opacity-50">
                  <p>Fill out the form above to see eligible schemes.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
