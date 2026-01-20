import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HelpPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow bg-[#FAFAFA] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="max-w-4xl mx-auto px-6 py-20">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-block bg-[#E8E6D9] text-[#5C5C4D] text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-6">
                            Help Center
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                            How Can We Help?
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Find answers to common questions about using CivicSense AI
                        </p>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">

                        {/* Getting Started */}
                        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                                Getting Started
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        What types of documents can I upload?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        You can upload any official government document including tax notices, legal circulars, policy notifications, gazette publications, and municipal orders. We support PDF, PNG, and JPG formats up to 10MB.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        How long does analysis take?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Most documents are analyzed within 30-60 seconds. Complex multi-page documents may take up to 2 minutes. You'll receive a notification when your analysis is ready.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        Is there a limit to how many documents I can upload?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Currently, there are no limits on the number of documents you can analyze. However, we recommend uploading one document at a time for the best results.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Understanding Results */}
                        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                                Understanding Your Results
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        What does the priority badge mean?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Priority badges (High, Medium, Low) indicate the urgency of the document based on deadlines, penalties, and compliance requirements. High priority documents typically require immediate action.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        What is the Action Checklist?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        The Action Checklist provides step-by-step tasks you need to complete in response to the notice. Each item includes clear instructions and recommended timelines. You can check off items as you complete them.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        How do I know if the analysis is accurate?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Our AI is trained on official government documents and legal texts. However, CivicSense AI is an assistive tool and should not replace professional legal advice. For critical decisions, we recommend consulting with a qualified legal professional.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Schemes & Benefits */}
                        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                                Schemes & Benefits
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        How does scheme matching work?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Our platform analyzes your eligibility criteria (age, income, occupation, location) and matches you with relevant government schemes. You can also browse the full schemes directory and filter by ministry or benefit type.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        Can I apply for schemes through CivicSense?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Currently, we provide information and eligibility checking for schemes. To apply, you'll need to visit the official government portal linked in the scheme details. We're working on direct application integration for future releases.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy & Security */}
                        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                                Privacy & Security
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        Is my data secure?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Yes. All documents are processed using 256-bit SSL encryption. We use strict data isolation protocols and never store your documents or personal information after processing. Your session data is automatically purged after analysis.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                        <span className="text-[#2F5233]">Q:</span>
                                        Can I delete my analysis results?
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-6">
                                        Analysis results are only stored in your browser session and are not saved to our servers. Closing your browser or clearing your session will remove all results. You can also download your results as a PDF or ZIP file for offline storage.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 bg-[#2F5233] text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-serif font-bold mb-3">Still need help?</h2>
                        <p className="text-green-100 mb-6">
                            Our support team is here to assist you with any questions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:support@civicsense.ai" className="bg-white text-[#2F5233] px-6 py-3 rounded font-bold text-sm hover:bg-green-50 transition-colors">
                                Email Support
                            </a>
                            <a href="/contact" className="border-2 border-white text-white px-6 py-3 rounded font-bold text-sm hover:bg-[#233d26] transition-colors">
                                Contact Form
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
