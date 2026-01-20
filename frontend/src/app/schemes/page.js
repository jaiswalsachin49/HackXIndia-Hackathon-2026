"use client";

import { useState } from "react";

export default function SchemePage() {
  const [form, setForm] = useState({
    age: "",
    income: "",
    occupation: "",
    state: "",
    category: ""
  });

  const [schemes, setSchemes] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const findSchemes = async () => {
    const res = await fetch(`${API_BASE}/api/v1/find-schemes`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        income: Number(form.income)
      })
    });

    const data = await res.json();
    setSchemes(data.eligible_schemes);
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Find Government Schemes You’re Eligible For
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        {["age", "income", "occupation", "state", "category"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="p-2 rounded bg-slate-800"
          />
        ))}
      </div>

      <button
        onClick={findSchemes}
        className="mt-6 bg-green-600 px-4 py-2 rounded"
      >
        Find Schemes
      </button>

      {schemes.length > 0 && (
        <ul className="mt-6 list-disc ml-6">
          {schemes.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
