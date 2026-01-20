"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterSidebar from "../../components/schemes/FilterSidebar";
import EligibilityForm from "../../components/schemes/EligibilityForm";
import SchemeCard from "../../components/schemes/SchemeCard";
import LoginRequiredModal from "../../components/LoginRequiredModal";

export default function SchemesPage() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");
  const [filters, setFilters] = useState({
    search: "",
    ministries: [],
    benefits: []
  });
  const [allResults, setAllResults] = useState([]); // Store all results for filtering
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("cs_token");
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);

  // Apply filters to results
  useEffect(() => {
    if (!searched || allResults.length === 0) return;

    let filtered = [...allResults];

    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(scheme =>
        scheme.name?.toLowerCase().includes(query) ||
        scheme.description?.toLowerCase().includes(query) ||
        scheme.ministry?.toLowerCase().includes(query) ||
        scheme.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by ministries
    if (filters.ministries.length > 0) {
      filtered = filtered.filter(scheme =>
        filters.ministries.some(ministry =>
          scheme.ministry?.includes(ministry.replace("Ministry of ", ""))
        )
      );
    }

    // Filter by benefit types
    if (filters.benefits.length > 0) {
      filtered = filtered.filter(scheme =>
        filters.benefits.some(benefit =>
          scheme.tags?.includes(benefit) ||
          scheme.description?.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }

    // Sorting Logic
    if (sortBy === "Latest") {
      // Since we don't have real dates, we'll reverse to show "newest" first (assuming bottom of list is newer)
      // or sort by name as a proxy for deterministic sorting
      filtered.reverse();
    } else {
      // Relevance - currently just keep original order or maybe score matches (too complex for now)
      // We'll leave it as is, which usually is by ID/insert order
    }

    setResults(filtered);
  }, [filters, allResults, searched, sortBy]);

  const handleTagClick = (tag) => {
    const cleanTag = tag.replace("#", "");
    setFilters(prev => ({ ...prev, search: cleanTag }));
  };

  const handleCheck = async (formData) => {
    // Validate form
    if (!formData.age || formData.age <= 0) {
      setError("Please enter a valid age");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    const body = {
      age: Number(formData.age),
      income: Number(formData.income),
      occupation: formData.occupation,
      state: formData.state,
      category: formData.category || "General"
    };

    try {
      const res = await fetch(`http://localhost:8000/api/v1/find-schemes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setAllResults(data.eligible_schemes || []);
      setResults(data.eligible_schemes || []);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch schemes. Please check your connection and try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-1">
        <FilterSidebar onFilterChange={setFilters} />

        <main className="flex-1 p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3">Government Schemes Directory</h1>
            <p className="text-base md:text-lg text-slate-500 mb-10">Identify, verify, and apply for government initiatives tailored to your profile.</p>

            <EligibilityForm onCheck={handleCheck} />

            {/* Popular Search Tags */}
            <div className="flex gap-2 flex-wrap mb-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-1">Popular Search Tags</span>
              {["#SeniorCitizens", "#WomenEmpowerment", "#RuralHousing", "#StartupIndia", "#Scholarships"].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded font-medium hover:bg-slate-200 cursor-pointer transition-colors border border-transparent hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                Eligible Schemes {searched && `(${results.length})`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                Sort by:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-none bg-transparent font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Latest">Latest</option>
                </select>
              </div>
            </div>

            <div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-red-800 font-semibold text-sm">Error</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
                  <p className="text-slate-600">Finding eligible schemes...</p>
                </div>
              ) : searched ? (
                results.length > 0 ? (
                  results.map((scheme, idx) => (
                    typeof scheme === 'string'
                      ? <SchemeCard key={idx} scheme={{ name: scheme, description: "Description unavailable in simple mode.", ministry: "Government of India" }} />
                      : <SchemeCard key={idx} scheme={scheme} />
                  ))
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-lg border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-slate-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Matching Schemes Found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      We couldn't find schemes matching your criteria. Try adjusting your age, income range, or occupation to see more results.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-20 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                  <p className="text-slate-600 text-lg">Fill out the form above to discover eligible schemes</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <LoginRequiredModal isOpen={showLoginModal} onClose={() => { }} />
    </div>
  );
}
