"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Eye, Users, FileText, CheckCircle, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#2F5233]/20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />

            <main className="flex-grow pt-20 pb-20">

                {/* 01. Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-32 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl lg:w-1/2"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-[#E8E6D9] text-[#5C5C4D] text-[10px] font-bold uppercase tracking-widest mb-8">
                            Our Mission
                        </span>
                        <h1 className="text-6xl md:text-7xl font-serif font-medium text-slate-900 mb-8 leading-tight">
                            Bridging the <br />
                            <span className="italic text-[#2F5233]">Civic Gap</span>.
                        </h1>
                        <p className="text-xl text-slate-500 font-light leading-relaxed mb-10">
                            We translate complex bureaucratic language into clear insights, empowering every citizen to understand their rights and access government services with confidence.
                        </p>
                        <div className="h-px w-24 bg-[#2F5233]/20 mt-8" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full lg:w-[600px] h-[500px] flex items-center justify-center"
                    >
                        {/* Abstract Blur blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2F5233]/5 rounded-full blur-3xl" />

                        <Image
                            src="/images/civic_mission_illustration.png"
                            alt="Civic Mission Illustration"
                            fill
                            className="object-contain drop-shadow-2xl z-10"
                            priority
                        />
                    </motion.div>
                </section>

                {/* 02. Values Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Privacy First */}
                        <div className="relative group p-8 rounded-3xl bg-white border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-[#2F5233]/20 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2F5233] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2F5233] transition-colors duration-300">
                                <Shield className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-[#2F5233] transition-colors">Privacy First</h3>
                            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">
                                Your data is sacred. We use military-grade encryption and ephemeral processing—your documents are analyzed in real-time and never stored.
                            </p>
                        </div>

                        {/* Transparency */}
                        <div className="relative group p-8 rounded-3xl bg-white border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-[#2F5233]/20 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2F5233] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2F5233] transition-colors duration-300">
                                <Eye className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-[#2F5233] transition-colors">Radical Transparency</h3>
                            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">
                                No black boxes. Our AI explains its reasoning clearly, citing specific clauses and regulations so you can verify every insight.
                            </p>
                        </div>

                        {/* Inclusivity */}
                        <div className="relative group p-8 rounded-3xl bg-white border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-[#2F5233]/20 hover:-translate-y-1">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2F5233] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2F5233] transition-colors duration-300">
                                <Users className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-[#2F5233] transition-colors">Built for Everyone</h3>
                            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">
                                Governance is for everyone. We support 12+ regional languages and simplified modes to ensure no citizen is left behind.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 03. How It Works - Horizontal Process */}
                <section className="bg-[#1c2e36] text-white py-32 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2F5233]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-2xl mb-24">
                            <span className="text-[#2F5233] font-bold tracking-widest uppercase text-sm mb-4 block">
                                Process
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
                                How we simplify governance.
                            </h2>
                            <p className="text-slate-400 text-lg font-light">
                                From complex legal documents to actionable insights in three simple steps.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10" />

                            {[
                                {
                                    step: "01",
                                    title: "Upload Document",
                                    desc: "Upload any government notice or circular. Our system accepts images and PDFs instantly.",
                                    icon: <FileText className="w-5 h-5" />
                                },
                                {
                                    step: "02",
                                    title: "AI Analysis",
                                    desc: "Our engine extracts key dates, obligations, and legal nuances using advanced OCR and NLP.",
                                    icon: <Eye className="w-5 h-5" />
                                },
                                {
                                    step: "03",
                                    title: "Actionable Insights",
                                    desc: "Get a plain-English summary and matched schemes that you can apply for immediately.",
                                    icon: <CheckCircle className="w-5 h-5" />
                                }
                            ].map((item, i) => (
                                <div key={i} className="relative">
                                    <div className="w-16 h-16 bg-[#2F5233] rounded-full flex items-center justify-center mb-8 border-4 border-[#1c2e36] relative z-10">
                                        <span className="font-bold text-lg">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 04. Team/CTA */}
                <section className="py-32 max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">
                        Built for change-makers.
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-12 text-lg">
                        CivicSense AI is developed by technologists and civic activists passionate about democratizing information. Join us in building a more informed society.
                    </p>
                    <a href="/upload" className="inline-flex items-center gap-2 text-[#2F5233] font-bold hover:gap-4 transition-all">
                        Try the platform <ArrowRight className="w-5 h-5" />
                    </a>
                </section>

            </main>

            <Footer />
        </div>
    );
}
