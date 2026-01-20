"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function SchemeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get scheme from localStorage (passed from schemes page)
        const schemesData = localStorage.getItem('currentScheme');
        if (schemesData) {
            setScheme(JSON.parse(schemesData));
            setLoading(false);
        } else {
            // Redirect back if no data
            router.push('/schemes');
        }
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading scheme details...</p>
                </div>
            </div>
        );
    }

    if (!scheme) return null;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />

            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-slate-600">
                        <button onClick={() => router.push('/schemes')} className="hover:text-slate-900">
                            ← Back to Schemes
                        </button>
                    </nav>

                    {/* Header Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-100">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                                        {scheme.ministry || "Government of India"}
                                    </span>
                                    <span className="bg-green-50 text-green-700 border border-green-100 text-xs px-2 py-0.5 rounded flex items-center gap-1 font-bold uppercase">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                        </svg>
                                        Official
                                    </span>
                                </div>
                                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3">
                                    {scheme.name}
                                </h1>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {scheme.description}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        {scheme.tags && scheme.tags.length > 0 && (
                            <div className="flex gap-2 flex-wrap mt-4">
                                {scheme.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Benefits Card */}
                        <div className="bg-white rounded-xl shadow p-6 border border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3-836 0 0-1.719-.755V6Z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-lg font-bold text-slate-900">Benefits</h2>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{scheme.benefits || "Benefits information not available"}</p>
                        </div>

                        {/* Eligibility Card */}
                        <div className="bg-white rounded-xl shadow p-6 border border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-lg font-bold text-slate-900">Eligibility</h2>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{scheme.eligibility || "Eligibility criteria not specified"}</p>
                        </div>
                    </div>

                    {/* Criteria Grid */}
                    <div className="bg-white rounded-xl shadow p-6 border border-slate-100 mb-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Eligibility Criteria</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Age Range</p>
                                <p className="text-lg font-bold text-slate-900">{scheme.age_min} - {scheme.age_max} years</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Max Income</p>
                                <p className="text-lg font-bold text-slate-900">
                                    {scheme.max_income >= 999999999 ? "No Limit" : `₹${(scheme.max_income / 100000).toFixed(1)}L`}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Category</p>
                                <p className="text-lg font-bold text-slate-900">{scheme.category || "General"}</p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Coverage</p>
                                <p className="text-lg font-bold text-slate-900">{scheme.state || "All India"}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow p-8 text-center border border-green-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Apply?</h3>
                        <p className="text-slate-600 mb-6">Visit the official portal to complete your application</p>
                        <a
                            href={scheme.apply_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
                        >
                            Apply Now on Official Portal
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
