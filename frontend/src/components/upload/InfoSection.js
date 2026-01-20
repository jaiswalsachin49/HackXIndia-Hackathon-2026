export default function InfoSection() {
    return (
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 mt-10">
            <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-800">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                    File Requirements
                </h4>
                <ul className="space-y-3">
                    {["Official Gazette Notifications", "Public Circulars & Orders", "Legal & Policy Documents"].map(req => (
                        <li key={req} className="flex items-center gap-2 text-xs text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#2F5233]">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                            </svg>
                            {req}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-800">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                    </svg>
                    Privacy & Security
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    Your documents are processed in a secure, encrypted environment. We do not store personal data after the session ends.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-slate-400">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                    </svg>
                    256-bit SSL Encrypted
                </div>
            </div>
        </div>
    );
}
