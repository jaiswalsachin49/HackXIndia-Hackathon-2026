import { useRef } from "react";

export default function Dropzone({ onFileSelect, file }) {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center bg-[#FDFDFC] hover:bg-slate-50 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
            />

            <div className="w-12 h-12 bg-slate-100 rounded-full grid place-items-center mx-auto mb-4 text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
            </div>

            {file ? (
                <div>
                    <p className="text-sm font-bold text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                        className="text-xs text-red-500 mt-2 hover:underline z-10 relative"
                        onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}
                    >
                        Remove File
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Click to upload or drag and drop</h3>
                    <p className="text-xs text-slate-400 mb-6">PDF, PNG or JPG (max. 10MB)</p>

                    <button className="bg-[#2F5233] text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-2 mx-auto hover:bg-[#233d26] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12 2.12-2.12m0 0 2.12 2.12-2.12 2.12" />
                        </svg>
                        Select File
                    </button>
                </>
            )}
        </div>
    );
}
