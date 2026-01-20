"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Mail, Send, CheckCircle, XCircle } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FAQs = [
    {
        question: "How do I update my profile information?",
        answer: "Go to your Account Settings page via the profile icon in the top right. From there, you can edit your personal details, correct your date of birth, and update your contact information."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption to protect your personal information. Your data is stored securely and is only used to provide you with relevant government scheme recommendations."
    },
    {
        question: "How do I apply for a scheme?",
        answer: "Once you find a scheme you are eligible for, click on the 'Apply Now' button. You will be redirected to the official government portal to complete your application."
    },
    {
        question: "What if I forget my password?",
        answer: "On the login page, click 'Forgot Password'. Enter your registered email address, and we will send you instructions to reset your password securely."
    },
    {
        question: "Can I track my application status?",
        answer: "Currently, application tracking happens on the respective government portals. We are working on a feature to help you track statuses directly from your dashboard in the future."
    }
];

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-b border-slate-200 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? "text-[#2F5233]" : "text-slate-900 group-hover:text-[#2F5233]"}`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${isOpen ? "bg-[#2F5233]/10 text-[#2F5233]" : "text-slate-400 group-hover:bg-slate-50"}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 leading-relaxed pr-8">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SuccessModal = ({ isOpen, onClose, email }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-[#2F5233]" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Message Sent!</h3>
                    <p className="text-slate-600 mb-8">
                        We have received your message and will respond to <span className="font-semibold text-slate-900">{email}</span> within 24 hours.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-[#2F5233] text-white py-3.5 rounded-xl font-bold hover:bg-[#244028] transition-colors"
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const MilestoneBar = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-50">
            {/* Connecting Line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-100">
                <motion.div
                    className="w-full bg-[#2F5233] origin-top"
                    style={{ scaleY: scrollYProgress }}
                />
            </div>

            {/* Milestones */}
            <div className="relative z-10 flex flex-col gap-32">
                {[0, 1, 2].map((i) => (
                    <MilestoneDot key={i} index={i} scrollYProgress={scrollYProgress} />
                ))}
            </div>
        </div>
    );
};

const MilestoneDot = ({ index, scrollYProgress }) => {
    // Calculate if this section is active based on scroll progress
    // Rough estimate: 0-0.3 (Hero), 0.3-0.6 (Contact), 0.6-1.0 (FAQ)
    const threshold = index * 0.3;

    return (
        <motion.div
            className="w-4 h-4 rounded-full border-2 border-[#2F5233] bg-white flex items-center justify-center"
            initial={false}
        >
            <motion.div
                className="w-2 h-2 rounded-full bg-[#2F5233]"
                animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                }}
            />
        </motion.div>
    );
};

export default function Help() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend validation
        if (!formData.name || !formData.email || !formData.description) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const dataReq = {
                access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                name: formData.name,
                email: formData.email,
                message: formData.description,
                subject: `New Help Request from ${formData.name}`,
                from_name: "Civic Sense Support Form"
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(dataReq),
            });

            const result = await response.json();

            if (result.success) {
                setSubmittedEmail(formData.email);
                setShowSuccess(true);
                setFormData({ name: "", email: "", description: "" });
            } else {
                console.error("Web3Forms Error:", result);
                alert("Failed to send message: " + (result.message || "Unknown error"));
            }

        } catch (error) {
            console.error("Error sending contact form:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#2F5233]/20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <Header />
            <MilestoneBar />

            <main className="flex-grow pt-24 pb-24">
                {/* 01. Intro Section */}
                <section className="min-h-[60vh] flex items-center justify-between px-6 mb-24 lg:pl-32 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="text-[#2F5233] font-bold tracking-widest uppercase text-sm mb-4 block">
                            01 — Support Center
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif font-medium text-slate-900 mb-8 leading-tight">
                            Here to <span className="italic text-[#2F5233]">help</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 max-w-xl font-light leading-relaxed">
                            Navigate the complexities of government schemes with ease. We're your personal guide to civic empowerment.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative w-[500px] h-[500px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2F5233]/5 to-transparent rounded-full blur-3xl" />
                        <Image
                            src="/images/civic_support_illustration.png"
                            alt="Civic Support Illustration"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
                </section>

                {/* 02. Contact Section */}
                <section id="contact" className="min-h-[80vh] flex items-center px-6 mb-24 lg:pl-32">
                    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-20 items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#2F5233] font-bold tracking-widest uppercase text-sm mb-4 block">
                                02 — Get in Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-8">
                                Describe your issue.
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed mb-12">
                                We value your feedback and queries. Our team usually responds within 24 hours.
                            </p>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, opacity: 0 }}
                            whileInView={{ opacity: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-[#2F5233] transition-colors">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg focus:border-[#2F5233] outline-none transition-colors placeholder:text-slate-300"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-[#2F5233] transition-colors">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg focus:border-[#2F5233] outline-none transition-colors placeholder:text-slate-300"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider group-focus-within:text-[#2F5233] transition-colors">Message</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="1"
                                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg focus:border-[#2F5233] outline-none transition-colors placeholder:text-slate-300 resize-none min-h-[50px]"
                                    placeholder="How can we help?"
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = e.target.scrollHeight + "px";
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-4 bg-[#2F5233] text-white px-8 py-4 rounded-full font-medium hover:bg-[#244028] transition-all hover:pr-10 group"
                            >
                                {loading ? "Sending..." : "Send Message"}
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.form>
                    </div>
                </section>

                {/* 03. FAQ Section */}
                <section className="min-h-[60vh] px-6 lg:pl-32 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl w-full"
                    >
                        <span className="text-[#2F5233] font-bold tracking-widest uppercase text-sm mb-4 block">
                            03 — Common Questions
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-16">
                            FAQ
                        </h2>

                        <div className="space-y-4">
                            {FAQs.map((faq, index) => (
                                <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                email={submittedEmail}
            />
        </div>
    );
}
