import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function InfoSection() {
    return (
        <div className="space-y-8 mt-12 pt-8 border-t border-slate-100/50">
            <div>
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Supported Formats
                </h4>
                <div className="flex gap-3">
                    {["PDF Documents", "Clear Images"].map(req => (
                        <div key={req} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                            <FileText className="w-3 h-3 text-[#2F5233]" />
                            {req}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Example Documents
                </h4>
                <div className="space-y-3">
                    {["Gazette Notifications", "Government Circulars", "Legal Orders"].map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2F5233]/40"></div>
                            {doc}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#2F5233]" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Privacy Guaranteed</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-0">
                    Your files are parsed in memory and automatically deleted after analysis. No data is stored.
                </p>
            </div>
        </div>
    );
}
