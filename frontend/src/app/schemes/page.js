"use client";

import { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Sparkles } from "lucide-react";
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
  const [allResults, setAllResults] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("cs_token");
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);

  // Load all schemes on page mount
  useEffect(() => {
    const fetchAllSchemes = async () => {
      setLoading(true);
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${API_BASE}/api/v1/schemes`);
        const data = await response.json();

        if (response.ok) {
          setAllResults(data.schemes || []);
          setResults(data.schemes || []);
          setInitialLoad(false);
        }
      } catch (err) {
        console.error("Error fetching all schemes:", err);
        setError("Failed to load schemes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllSchemes();
  }, []);

  // Apply filters to results
  useEffect(() => {
    if (allResults.length === 0) return;

    let filtered = [...allResults];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(scheme =>
        scheme.name?.toLowerCase().includes(query) ||
        scheme.description?.toLowerCase().includes(query) ||
        scheme.ministry?.toLowerCase().includes(query) ||
        scheme.category?.toLowerCase().includes(query) ||
        scheme.benefits?.toLowerCase().includes(query)
      );
    }

    if (filters.ministries.length > 0) {
      filtered = filtered.filter(scheme =>
        filters.ministries.some(ministry =>
          scheme.ministry?.includes(ministry.replace("Ministry of ", ""))
        )
      );
    }

    if (filters.benefits.length > 0) {
      filtered = filtered.filter(scheme =>
        filters.benefits.some(benefit =>
          scheme.category?.toLowerCase().includes(benefit.toLowerCase()) ||
          scheme.description?.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }

    if (sortBy === "Latest") {
      filtered.reverse();
    }

    setResults(filtered);
  }, [filters, allResults, sortBy]);

  const handleTagClick = (tag) => {
    setFilters(prev => ({ ...prev, search: tag }));
  };

  const popularTags = ["Farmer", "Student", "BPL", "Business", "Girl Child", "Rural"];

  const handleEligibilitySubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/v1/find-schemes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(formData.age),
          income: Number(formData.income),
          occupation: formData.occupation,
          state: formData.state,
          category: formData.category || "General"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAllResults(data.eligible_schemes || []);
        setResults(data.eligible_schemes || []);
        setSearched(true);
        setShowEligibilityForm(false);
      } else {
        setError(data.error || "An error occurred while fetching schemes");
      }
    } catch (err) {
      console.error("Error fetching schemes:", err);
      setError("Failed to fetch schemes. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="flex-grow">
        <div className="flex">
          <FilterSidebar onFilterChange={setFilters} />

          <div className="flex-1 py-8 px-6 lg:px-12">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-12">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-3">
                  Government Schemes
                </h1>
                <p className="text-slate-500 text-base">
                  Discover welfare programs tailored to your needs
                </p>
              </div>

              {/* Stats Bar */}
              {results.length > 0 && (
                <div className="flex gap-4 mt-6">
                  <div className="bg-white rounded-xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2F5233]/10 rounded-full flex items-center justify-center">
                      <Filter className="w-5 h-5 text-[#2F5233]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{searched ? "Eligible" : "Available"}</p>
                      <p className="text-lg font-bold text-slate-900">{results.length} Schemes</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2F5233]/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#2F5233]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Sort by</p>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm font-bold text-slate-900 bg-transparent outline-none cursor-pointer"
                      >
                        <option value="Relevance">Relevance</option>
                        <option value="Latest">Latest</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Eligibility Form - Collapsible */}
            <div className="max-w-7xl mx-auto mb-12">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#2F5233]/5 to-transparent p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900 mb-1">
                        Find Personalized Schemes
                      </h2>
                      <p className="text-sm text-slate-500">
                        Fill in your details to discover schemes you're eligible for
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <EligibilityForm onCheck={handleEligibilitySubmit} loading={loading} />
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            {!searched && (
              <div className="max-w-7xl mx-auto mb-12">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
                  Popular Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="bg-white text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium border border-slate-200 hover:border-[#2F5233] hover:bg-[#2F5233]/5 hover:text-[#2F5233] transition-all shadow-sm hover:shadow-md"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="max-w-7xl mx-auto text-center py-20">
                <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg border border-slate-100">
                  <div className="w-5 h-5 border-2 border-[#2F5233] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-bold text-slate-700">Finding schemes for you...</span>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {!loading && results.length > 0 && (
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                  {searched ? "Eligible Schemes for You" : "All Available Schemes"}
                </h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((scheme, index) => (
                    <SchemeCard key={index} scheme={scheme} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searched && !loading && results.length === 0 && !error && (
              <div className="max-w-7xl mx-auto text-center py-20">
                <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No schemes found</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setSearched(false);
                    setResults([]);
                    setAllResults([]);
                    setFilters({ search: "", ministries: [], benefits: [] });
                  }}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#2F5233] transition-colors"
                >
                  Start New Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <LoginRequiredModal isOpen={showLoginModal} onClose={() => { }} />
    </div>
  );
}
