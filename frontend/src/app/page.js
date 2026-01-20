"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        CivicSense AI
      </h1>

      <p className="text-slate-300 text-center max-w-xl mb-8">
        Government & legal notices explained in simple Hinglish.
        Know what it means, how serious it is, and what you should do next.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/upload")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Upload a Notice
        </button>

        <button
          onClick={() => router.push("/schemes")}
          className="border border-slate-500 hover:bg-slate-800 px-6 py-3 rounded-lg"
        >
          Find Schemes
        </button>
      </div>
    </main>
  );
}
