"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Toast from "../../components/Toast";

export default function ResultsPage() {
    const router = useRouter();
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('english');
    const [translatedContent, setTranslatedContent] = useState(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [toast, setToast] = useState({ message: '', type: 'info' });

    // Speaker Component with Smart Voice Selection
    // Speaker Component with Smart Voice Selection & Backend TTS Support
    const SpeakerButton = ({ text }) => {
        const [isSpeaking, setIsSpeaking] = useState(false);
        const [audioPlayer, setAudioPlayer] = useState(null);

        const handleSpeak = async (e) => {
            e.stopPropagation();

            // Stop if currently speaking
            if (isSpeaking) {
                if (audioPlayer) {
                    audioPlayer.pause();
                    setAudioPlayer(null);
                } else {
                    window.speechSynthesis.cancel();
                }
                setIsSpeaking(false);
                return;
            }

            if (!text) return;

            setIsSpeaking(true);

            // 1. Backend TTS for Regional Languages (or if user prefers)
            if (language !== 'english' && language !== 'hinglish') {
                try {
                    const token = localStorage.getItem("cs_token");
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tts`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            text: text,
                            language: language
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const audio = new Audio(`data:audio/mp3;base64,${data.audio_content}`);
                        audio.onended = () => {
                            setIsSpeaking(false);
                            setAudioPlayer(null);
                        };
                        audio.play();
                        setAudioPlayer(audio);
                        return; // Exit, audio is playing
                    }
                } catch (error) {
                    console.error("Backend TTS failed, falling back to browser:", error);
                    // Fallthrough to browser TTS
                }
            }

            // 2. Browser TTS (English / Hinglish / Fallback)
            const utterance = new SpeechSynthesisUtterance(text);

            // Smart Voice Selection
            const voices = window.speechSynthesis.getVoices();
            const preferredVoices = [
                'Google US English',
                'Microsoft Zira',
                'Samantha',
                'Alex'
            ];

            const selectedVoice = voices.find(v =>
                preferredVoices.some(p => v.name.includes(p))
            ) || voices.find(v => v.lang.startsWith('en'));

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        };

        return (
            <button
                onClick={handleSpeak}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all shadow-sm ${isSpeaking
                    ? 'bg-rose-100 text-rose-700 animate-pulse ring-2 ring-rose-200'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    }`}
            >
                {isSpeaking ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>
                )}
                <span className="font-bold text-sm tracking-wide">
                    {isSpeaking ? 'Stop Reading' : 'Listen to Summary'}
                </span>
            </button>
        );
    };

    const translateText = async (text, targetLang) => {
        if (!text || targetLang === 'english') return text;
        try {
            const token = localStorage.getItem("cs_token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: text,
                    target_language: targetLang
                })
            });
            if (response.ok) {
                const data = await response.json();
                return data.translated_text;
            }
        } catch (error) {
            console.error("Translation error:", error);
        }
        return text; // Fallback
    };

    const handleLanguageChange = async (newLang) => {
        setLanguage(newLang);

        // Reset if switching back to English or Hinglish (cached in displayData logic)
        if (newLang === 'english' || newLang === 'hinglish') {
            setTranslatedContent(null);
            return;
        }

        // Trigger translation
        setIsTranslating(true);
        try {
            // We need access to the CURRENT English content to translate
            // We can get it from resultData logic locally or pre-calculate it
            // Better to re-derive the current english text

            const englishExplanation = parseContent(resultData?.explanation?.english || resultData?.explanation);

            // Translate critical sections in parallel
            const [summary, expl, reason, deadlines] = await Promise.all([
                translateText(englishExplanation["Summary"], newLang),
                translateText(englishExplanation["Explanation"], newLang),
                translateText(englishExplanation["Reason"], newLang),
                translateText(englishExplanation["Important Deadlines"], newLang)
            ]);

            setTranslatedContent({
                summary: summary,
                explanation: expl,
                reason: reason,
                deadlines: deadlines
            });

        } catch (e) {
            console.error(e);
            setToast({ message: "Translation failed. Please try again.", type: "error" });
        } finally {
            setIsTranslating(false);
        }
    };

    useEffect(() => {
        // Check login
        const token = localStorage.getItem("cs_token");
        if (!token) {
            router.push("/login");
            return;
        }

        // Load data from localStorage
        const storedData = localStorage.getItem('noticeResult');
        const fileName = localStorage.getItem('uploadedFile');

        if (storedData) {
            const data = JSON.parse(storedData);

            // CRITICAL: Clean up explanation data to ensure it's properly formatted
            // This handles both old data formats and ensures objects are never rendered
            if (data.explanation && typeof data.explanation === 'object') {
                // If explanation has english/hinglish fields that are objects, convert them to strings
                if (data.explanation.english && typeof data.explanation.english === 'object') {
                    data.explanation.english = JSON.stringify(data.explanation.english, null, 2);
                }
                if (data.explanation.hinglish && typeof data.explanation.hinglish === 'object') {
                    data.explanation.hinglish = JSON.stringify(data.explanation.hinglish, null, 2);
                }
                // If explanation itself is a complex object (old format), convert to string
                if (!data.explanation.english && !data.explanation.hinglish) {
                    const explanationStr = JSON.stringify(data.explanation, null, 2);
                    data.explanation = {
                        english: explanationStr,
                        hinglish: explanationStr
                    };
                }
            }

            setResultData({
                ...data,
                fileName: fileName || 'Uploaded Document'
            });
            setLoading(false);
        } else {
            // No data found, redirect to upload
            router.push('/upload');
        }
    }, [router]);

    const handlePrint = () => window.print();

    const handleDownloadZIP = () => {
        const formatForFile = (content) => {
            if (!content) return "No explanation available.";
            if (typeof content === 'string') return content;
            return JSON.stringify(content, null, 2); // Simple stringify for file download is safer/easier
        };

        const explanationText = (typeof resultData?.explanation === 'object')
            ? `ENGLISH SUMMARY:\n${formatForFile(resultData.explanation.english)}\n\n-------------------\n\nHINGLISH SUMMARY:\n${formatForFile(resultData.explanation.hinglish)}`
            : resultData?.explanation;

        const content = `CIVICSENSE AI ANALYSIS\n\nDocument: ${resultData?.fileName}\nNotice Type: ${resultData?.notice_type}\nSeverity: ${resultData?.severity}\n\n${explanationText}\n\n---\nGenerated by CivicSense AI`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `civicsense_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading || !resultData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading results...</p>
                </div>
            </div>
        );
    }

    // Check for invalid document (Resume/Personal)
    if (resultData?.explanation?.is_notice === false) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {resultData.notice_type === "No_Text_Detected" ? "Unreadable Image detected" : "Document Not Recognized"}
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        {(() => {
                            let errorMsg = resultData.explanation.english || "This does not appear to be a valid government notice.";

                            // If it's a JSON string, parse it and extract readable parts
                            if (typeof errorMsg === 'string' && errorMsg.includes('{')) {
                                try {
                                    const parsed = JSON.parse(errorMsg);
                                    if (parsed.Explanation) {
                                        return parsed.Explanation;
                                    }
                                } catch (e) {
                                    // If parsing fails, use the string as-is
                                }
                            }

                            return errorMsg;
                        })()}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6 text-left">
                        <h3 className="font-semibold text-slate-900 mb-2 text-sm">Why was this rejected?</h3>
                        <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
                            {resultData.notice_type === "No_Text_Detected" ? (
                                <>
                                    <li>Image contains no readable text</li>
                                    <li>Might be a photo of an object or scene</li>
                                    <li>Image quality is too blurry or dark</li>
                                </>
                            ) : (
                                <>
                                    <li>Document appears to be a resume or CV</li>
                                    <li>Contains personal/professional details, not official notices</li>
                                    <li>No government or legal notice content detected</li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg text-amber-800 text-sm mb-6 text-left">
                        <strong>Note:</strong> CivicSense AI is designed specifically for government and legal notices. Resumes, personal photos, or homework code assignments are not supported.
                    </div>
                    <button
                        onClick={() => router.push('/upload')}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
                    >
                        Upload Another Document
                    </button>
                </div>
            </div>
        );
    }


    // Helper to format explanation content
    const formatContent = (content) => {
        if (!content) return "No explanation available.";
        if (typeof content === 'string') return content;

        // Handle object content (from Groq JSON)
        return Object.entries(content)
            .map(([key, value]) => {
                // Ensure value is safely converted to string
                let val = value;
                if (Array.isArray(value)) {
                    val = value.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join('\n- ');
                } else if (typeof value === 'object' && value !== null) {
                    val = JSON.stringify(value, null, 2);
                } else {
                    val = String(value || '');
                }
                return `**${key}:**\n${val}`;
            })
            .join('\n\n');
    };

    // Helper to safely parse JSON content
    const parseContent = (content) => {
        if (!content) return {};
        if (typeof content === 'object') return content;
        try {
            return JSON.parse(content);
        } catch (e) {
            return { Explanation: content };
        }
    };

    const rawExplanation = (typeof resultData?.explanation === 'object')
        ? (language === 'english' ? resultData.explanation.english : resultData.explanation.hinglish)
        : resultData?.explanation;

    const parsedExplanation = parseContent(rawExplanation);

    // Dynamic Data Construction
    const displayData = {
        documentType: resultData?.notice_type || "Government Notice",
        // PRIORITY: Title from JSON > notice_type > filename
        title: parsedExplanation["Title"] || resultData?.notice_type || resultData?.fileName || "Document Analysis",
        noticeNo: parsedExplanation["Notice Number"] || "N/A",
        issuingAuthority: parsedExplanation["Issuing Authority"] || "Government Authority",
        priority: resultData?.severity || "Medium Priority",
        effectiveDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }), // Fallback current date
        deadline: parsedExplanation["Important Deadlines"] || "Refer to notice",
        compliance: "ANALYZED",
        daysToRespond: "Check Deadlines",

        // Sections
        summary: translatedContent?.summary || parsedExplanation["Summary"] || null,
        explanation: translatedContent?.explanation || parsedExplanation["Explanation"] || "No explanation available.",
        reason: translatedContent?.reason || parsedExplanation["Reason"] || "Reason not specified.",
        nextSteps: Array.isArray(parsedExplanation["Next Steps"])
            ? parsedExplanation["Next Steps"]
            : (parsedExplanation["Next Steps"] ? [parsedExplanation["Next Steps"]] : []),

        deadlines: translatedContent?.deadlines || parsedExplanation["Important Deadlines"] || "No specific deadlines mentioned.",

        whoIsAffected: parsedExplanation["Who is affected"]
            ? (Array.isArray(parsedExplanation["Who is affected"])
                ? parsedExplanation["Who is affected"].map(label => ({ icon: "👤", label }))
                : [{ icon: "👤", label: parsedExplanation["Who is affected"] }])
            : [{ icon: "👤", label: "All Citizens" }],

        implications: parsedExplanation["Reason"] || "Please review the document carefully.",

        actionChecklist: (Array.isArray(parsedExplanation["Next Steps"]) ? parsedExplanation["Next Steps"] : [])
            .map(step => ({
                title: step,
                description: "Action required based on the notice."
            })),

        applicableSchemes: {
            title: resultData?.scheme_suggestions && resultData?.scheme_suggestions.length > 0
                ? resultData?.scheme_suggestions[0].name
                : "Government Schemes",
            description: "Based on this notice, you may be eligible for the following government schemes.",
            incentive: resultData?.scheme_suggestions && resultData?.scheme_suggestions.length > 0
                ? {
                    title: resultData?.scheme_suggestions[0].name,
                    description: resultData?.scheme_suggestions[0].description || "Government assistance program"
                }
                : {
                    title: "No specific schemes identified",
                    description: "Please check the schemes directory for applicable programs."
                }
        }
    };

    // Ensure action checklist has items if parsing failed to produce array
    if (displayData.actionChecklist.length === 0 && parsedExplanation["Next Steps"]) {
        displayData.actionChecklist.push({
            title: "Review Notice",
            description: String(parsedExplanation["Next Steps"])
        });
    }


    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow">
                {/* Action Bar */}
                <div className="bg-[#FAFAFA] border-b border-slate-200 py-3 px-6">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <button
                            onClick={() => router.push('/upload')}
                            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Dashboard
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    if (!resultData) return;
                                    try {
                                        const token = localStorage.getItem("cs_token");
                                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/documents/save`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: JSON.stringify({
                                                filename: resultData.fileName,
                                                title: displayData.title,
                                                notice_type: resultData.notice_type,
                                                severity: resultData.severity,
                                                explanation: resultData.explanation
                                            })
                                        });

                                        if (response.ok) {
                                            setToast({ message: "Analysis saved successfully!", type: "success" });
                                        } else {
                                            setToast({ message: "Failed to save analysis.", type: "error" });
                                        }
                                    } catch (error) {
                                        console.error("Save error:", error);
                                        setToast({ message: "An error occurred while saving.", type: "error" });
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide bg-slate-900 text-white rounded hover:bg-slate-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                Save Analysis
                            </button>
                            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide border border-slate-300 rounded hover:bg-slate-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                </svg>
                                Print
                            </button>
                            <button onClick={handleDownloadZIP} className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide border border-slate-300 rounded hover:bg-slate-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                ZIP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Document Container */}
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="bg-white border-l-4 border-slate-900 shadow-lg">

                        <div className="p-12 pb-8 border-b border-slate-200">
                            <div className="mb-8 flex justify-between items-start">
                                <div>
                                    <div className="text-slate-400 uppercase tracking-widest font-bold mb-2">Issuing Authority</div>
                                    <div className="text-slate-700 font-medium text-lg">{displayData.issuingAuthority}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-slate-400 uppercase tracking-widest font-bold mb-2">Priority</div>
                                    <span className="text-orange-600 font-bold text-xs bg-orange-50 px-3 py-1 rounded-full border border-orange-100 flex items-center gap-2">
                                        ⚠ {displayData.priority}
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight break-words">
                                {displayData.title}
                            </h1>

                            <div className="flex gap-3">
                                <span className="bg-green-50 text-green-700 px-4 py-2 rounded text-xs font-bold uppercase tracking-wide border border-green-200">
                                    ✓ {displayData.compliance}
                                </span>
                                <span className="bg-green-100 text-green-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wide">
                                    ⏱ {displayData.daysToRespond}
                                </span>
                            </div>
                        </div>


                        {/* Translation & Summary Section */}
                        <div className="p-12 bg-green-50 border-b border-green-100">

                            {/* Controls Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div className="flex items-center gap-4">
                                    {/* Primary Toggle: English <-> Hinglish */}
                                    <button
                                        onClick={() => handleLanguageChange(language === 'english' ? 'hinglish' : 'english')}
                                        className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all flex items-center gap-2 ${(language === 'english' || language === 'hinglish')
                                            ? 'bg-slate-900 text-white shadow-lg hover:bg-slate-800'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
                                            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                        </svg>
                                        {language === 'hinglish' ? 'Switch to English' : 'Read in Hinglish'}
                                    </button>

                                    {/* Secondary: More Languages */}
                                    <div className="relative group">
                                        <select
                                            value={(language !== 'english' && language !== 'hinglish') ? language : ''}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                                        >
                                            <option value="" disabled>More Languages</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Bengali">Bengali</option>
                                            <option value="Tamil">Tamil</option>
                                            <option value="Telugu">Telugu</option>
                                            <option value="Marathi">Marathi</option>
                                            <option value="Gujarati">Gujarati</option>
                                            <option value="Kannada">Kannada</option>
                                            <option value="Malayalam">Malayalam</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="space-y-6">
                                <div className="grid gap-4">
                                    {/* Summary Section */}
                                    {displayData.summary && (
                                        <div className="p-4 rounded-lg border bg-emerald-50 border-emerald-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-emerald-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" /><path d="M12 2.25a9.75 9.75 0 0 1-9.75 9.75c0 .324.016.645.047.961 1.025-1.309 2.508-2.316 4.203-2.711V12a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v-1.75c1.696.395 3.179 1.402 4.204 2.711.031-.316.047-.637.047-.961 0-5.385-4.365-9.75-9.75-9.75Z" /></svg>
                                                    Summary
                                                </h4>
                                            </div>
                                            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pl-6 relative">
                                                {isTranslating ? (
                                                    <div className="animate-pulse flex space-x-4">
                                                        <div className="h-2 bg-emerald-200 rounded w-3/4"></div>
                                                    </div>
                                                ) : (
                                                    displayData.summary
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Explanation Section */}
                                    <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" /></svg>
                                                Explanation
                                            </h4>
                                        </div>
                                        <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pl-6 relative">
                                            {isTranslating ? (
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                                                </div>
                                            ) : (
                                                displayData.explanation
                                            )}
                                        </div>
                                    </div>

                                    {/* Reason Section */}
                                    <div className="p-4 rounded-lg border bg-amber-50 border-amber-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-amber-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" /></svg>
                                                Reason
                                            </h4>
                                        </div>
                                        <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pl-6 relative">
                                            {isTranslating ? (
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="h-2 bg-amber-200 rounded w-3/4"></div>
                                                </div>
                                            ) : (
                                                displayData.reason
                                            )}
                                        </div>
                                    </div>

                                    {/* Deadlines Section */}
                                    {displayData.deadlines && (
                                        <div className="p-4 rounded-lg border bg-red-50 border-red-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-red-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
                                                    Important Deadlines
                                                </h4>
                                            </div>
                                            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pl-6 relative">
                                                {isTranslating ? (
                                                    <div className="animate-pulse flex space-x-4">
                                                        <div className="h-2 bg-red-200 rounded w-3/4"></div>
                                                    </div>
                                                ) : (
                                                    displayData.deadlines
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Who is Affected & Implications */}
                        <div className="p-12 grid md:grid-cols-2 gap-12 border-b border-slate-200">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Who is Affected</h3>
                                <div className="space-y-4">
                                    {displayData.whoIsAffected.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-sm text-slate-700">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Context & Implications</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {displayData.implications}
                                </p>
                            </div>
                        </div>

                        {/* Action Checklist -> What you need to do next */}
                        <div className="p-12 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-5 h-5 bg-slate-900 text-white grid place-items-center text-xs rounded">➡</span>
                                What you need to do next
                            </h3>
                            <div className="space-y-6">
                                {displayData.actionChecklist.length > 0 ? (
                                    <div className="grid gap-4">
                                        {displayData.actionChecklist.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                                <div className="flex-shrink-0 w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic">No specific actions found.</p>
                                )}
                            </div>
                        </div>



                        {/* Footer */}
                        <div className="p-6 bg-slate-50 text-center">
                            <p className="text-xs text-slate-400">
                                Generated by <span className="font-bold text-slate-600">CivicSense AI</span>. This is an AI-assisted document analysis and should not be considered as binding legal advice. For the most accurate interpretation, please consult a legal professional for the original notice of the legal authority involved.
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                                ID: AN-2024-01-20-1234 | Dec 20, 2026 3:15 PM
                            </p>
                        </div>

                    </div>

                    {/* Green Stamp */}
                    <div className="flex justify-end mt-8">
                        <div className="bg-green-100 border-2 border-green-600 rounded-lg px-6 py-4 rotate-3 shadow-md">
                            <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600 mx-auto mb-1">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                                <div className="text-green-800 font-bold text-xs uppercase tracking-wider">Verified</div>
                                <div className="text-green-700 font-bold text-sm">Analysis<br />Complete</div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, message: '' })}
            />
        </div>
    );
}
