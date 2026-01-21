"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Toast from "../../components/Toast";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function HistoryPage() {
    const router = useRouter();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState({ message: '', type: 'info' });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, docId: null });

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("cs_token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/documents/history`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setDocuments(data);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [router]);

    const handleViewDocument = (doc) => {
        // Reuse results page by setting localStorage
        localStorage.setItem('noticeResult', JSON.stringify({
            notice_type: doc.notice_type,
            severity: doc.severity,
            explanation: doc.explanation,
            scheme_suggestions: [], // TODO: store schemes if needed, or re-fetch? For now empty
        }));
        localStorage.setItem('uploadedFile', doc.filename);
        router.push('/results');
    };

    const confirmDelete = (e, docId) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, docId });
    };

    const handleDeleteDocument = async () => {
        const docId = deleteModal.docId;
        if (!docId) return;

        const token = localStorage.getItem("cs_token");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/documents/${docId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setDocuments(prev => prev.filter(d => d.id !== docId));
                setToast({ message: "Document deleted successfully", type: "success" });
            } else {
                setToast({ message: "Failed to delete document", type: "error" });
            }
        } catch (error) {
            console.error("Error deleting document:", error);
            setToast({ message: "An error occurred", type: "error" });
        }
    };

    const filteredDocuments = documents.filter(doc =>
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.notice_type && doc.notice_type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Document History</h1>
                        <p className="text-slate-600">Access your previously analyzed notices and documents.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233] focus:border-transparent transition-all"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No documents found</h3>
                        <p className="text-slate-500 mb-6">You haven't saved any documents yet.</p>
                        <button
                            onClick={() => router.push('/upload')}
                            className="bg-[#2F5233] text-white px-6 py-2.5 rounded-xl hover:bg-[#234a2e] transition-colors font-medium text-sm"
                        >
                            Upload New Document
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                onClick={() => handleViewDocument(doc)}
                                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-[#2F5233] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F5F8F5] rounded-lg grid place-items-center flex-shrink-0 text-[#2F5233]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.375 5.375h4.125v6.75a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25H6.75A2.25 2.25 0 0 1 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25h12.75a2.25 2.25 0 0 0 2.25-2.25v-12z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-[#2F5233] transition-colors mb-1">
                                            {doc.title || doc.filename || "Untitled Document"}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 text-xs">

                                            {doc.severity && (
                                                <span className={`px-2 py-0.5 rounded font-medium ${doc.severity.includes("High") || doc.severity.includes("Urgent")
                                                    ? "bg-red-50 text-red-700"
                                                    : "bg-amber-50 text-amber-700"
                                                    }`}>
                                                    {doc.severity}
                                                </span>
                                            )}
                                            <span className="text-slate-400">•</span>
                                            <span className="text-slate-400">
                                                {new Date(doc.created_at).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => confirmDelete(e, doc.id)}
                                        className="p-2 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, message: '' })}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={handleDeleteDocument}
                title="Delete Document"
                message="Are you sure you want to delete this document? This action cannot be undone."
            />
        </div>
    );
}
