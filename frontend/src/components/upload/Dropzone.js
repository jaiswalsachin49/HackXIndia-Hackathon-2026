import { useRef, useState } from "react";
import { UploadCloud, File, CheckCircle } from "lucide-react";

export default function Dropzone({ onFileSelect, file }) {
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    // Theme color #2F5233
    const strokeColor = encodeURIComponent("#2F5233");

    return (
        <div
            className={`relative group rounded-xl transition-all duration-300 ease-out cursor-pointer overflow-hidden bg-[#FDFDFC] hover:bg-slate-50 ${isDragOver ? "scale-[1.02]" : "hover:scale-[1.01]"
                }`}
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='${isDragOver ? strokeColor : '%23CBD5E1'}' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            {/* Moving Border Animation Layer */}
            <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='${strokeColor}' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                    opacity: isDragOver ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    animation: isDragOver ? 'march 1s linear infinite' : 'none'
                }}
            />
            {/* CSS Animation Keyframes */}
            <style jsx>{`
                @keyframes march {
                    to {
                        stroke-dashoffset: -24;
                    }
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: -24;
                    }
                }
                /* We need to apply the animation to the stroke-dashoffset of the SVG rect, but since it's a background image, we can't animate dashoffset directly.
                   Instead, we can use a mask or simpler: CSS border-image? No, rounded corners support is poor.
                   Wait, simpler approach: Use a container with a moving background position? No.
                   Best approach for React:
                   The 'stroke-dashoffset' in the SVG data URI is static. 
                   Actually, let's use a real SVG overlay for animation.
                */
            `}</style>

            {/* Better Approach: Real SVG Overlay for Animation */}
            {isDragOver && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
                    <rect
                        x="1" y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        rx="11" ry="11"
                        fill="none"
                        stroke="#2F5233"
                        strokeWidth="2"
                        strokeDasharray="12 12"
                        className="animate-[dash_1s_linear_infinite]"
                    />
                </svg>
            )}

            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
            />

            {/* Content */}
            <div className="relative p-10 flex flex-col items-center justify-center text-center z-10">
                {file ? (
                    <div className="w-full animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-[#2F5233]/10 text-[#2F5233] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                            <File className="w-8 h-8" />
                            <div className="absolute -top-2 -right-2 bg-[#2F5233] text-white rounded-full p-1 border-2 border-white shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 truncate max-w-[200px] mx-auto">{file.name}</h3>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 mb-4 uppercase tracking-wide">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to Analyze
                        </p>

                        <button
                            className="bg-white border border-slate-200 text-slate-500 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all z-20 relative shadow-sm"
                            onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}
                        >
                            Change File
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={`w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 ${isDragOver ? "scale-110 border-transparent" : "text-slate-400 group-hover:scale-105"}`}>
                            <UploadCloud className={`w-8 h-8 transition-colors ${isDragOver ? "text-[#2F5233]" : "text-slate-400"}`} />
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-2">
                            Drag & drop your file here
                        </h3>
                        <p className="text-xs text-slate-500 mb-6 max-w-[200px]">
                            or click to browse from your device
                        </p>

                        <div className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-colors ${isDragOver ? "bg-[#2F5233] text-white border-[#2F5233]" : "bg-white text-slate-600 border-slate-200 group-hover:border-slate-300"
                            }`}>
                            Browse Files
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
