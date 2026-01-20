import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow bg-[#FAFAFA] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-block bg-[#E8E6D9] text-[#5C5C4D] text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-6">
                            About the Platform
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                            Making Government<br />Accessible to All
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            CivicSense AI is an intelligent platform designed to bridge the gap between complex government documentation and everyday citizens.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-12 mb-8">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Every day, millions of citizens receive government notices written in complex legal language. These documents often contain critical information about taxes, regulations, welfare schemes, and civic responsibilities—but understanding them requires legal expertise that most people don't have.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            CivicSense AI was created to solve this problem. We use advanced artificial intelligence to translate bureaucratic jargon into clear, simple language that anyone can understand. Our platform doesn't just simplify text—it provides context, highlights action items, and connects you with relevant government schemes that can help.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We believe that transparent, accessible government information is a fundamental right. When citizens understand their rights and responsibilities, they can participate more actively in civic life and hold institutions accountable.
                        </p>
                    </div>

                    {/* How It Works */}
                    <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-12 mb-8">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">How It Works</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#2F5233] text-white rounded-full grid place-items-center font-bold flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2">Upload Your Document</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Simply upload any government notice, circular, or official document to our secure platform.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#2F5233] text-white rounded-full grid place-items-center font-bold flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2">AI Analysis</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Our AI processes the document, extracting key information, deadlines, and action items. It identifies the document type, urgency level, and affected parties.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#2F5233] text-white rounded-full grid place-items-center font-bold flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2">Get Clear Insights</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Receive a simplified summary with plain-language explanations, step-by-step action checklists, and recommendations for applicable government schemes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-[#2F5233] text-white rounded-full grid place-items-center font-bold flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2">Discover Relevant Schemes</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Use our intelligent Scheme Directory to find government programs you're eligible for. Enter your details like age, income, occupation, and location, and we'll match you with relevant schemes from various ministries. Filter by benefit type, explore scheme details, and get direct links to official application portals.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Security */}
                    <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-12 mb-8">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Privacy & Security</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We take your privacy seriously. All documents are processed using end-to-end encryption, and we never store your personal information or documents after analysis.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our platform is designed with strict data isolation protocols to ensure that your sensitive information remains confidential. We comply with all applicable data protection regulations and industry best practices.
                        </p>
                    </div>

                    {/* Team */}
                    <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Built for Citizens</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            CivicSense AI is developed by a team of technologists, legal experts, and civic activists who believe in the power of technology to create a more transparent and accessible government.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our platform is continuously updated with the latest regulations and government schemes to ensure you always have access to accurate, up-to-date information.
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
