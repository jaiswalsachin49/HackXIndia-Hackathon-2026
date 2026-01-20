"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Profile() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("profile");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Account Settings</h1>
                        <p className="mt-2 text-slate-500">Manage your personal information and security preferences.</p>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-3 mb-8 lg:mb-0">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "profile"
                                            ? "bg-white text-[#2F5233] shadow-sm ring-1 ring-slate-200"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                >
                                    <svg className={`w-5 h-5 ${activeTab === "profile" ? "text-[#2F5233]" : "text-slate-400 group-hover:text-slate-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile Settings
                                </button>

                                <button
                                    onClick={() => setActiveTab("password")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "password"
                                            ? "bg-white text-[#2F5233] shadow-sm ring-1 ring-slate-200"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                >
                                    <svg className={`w-5 h-5 ${activeTab === "password" ? "text-[#2F5233]" : "text-slate-400 group-hover:text-slate-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Security
                                </button>
                            </nav>

                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <button
                                    onClick={() => router.push("/login")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <div className="lg:col-span-9">
                            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                                {activeTab === "profile" && (
                                    <div className="p-8">
                                        {/* Avatar Header */}
                                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                                            <div className="relative group">
                                                <div className="w-24 h-24 rounded-full bg-slate-100 ring-4 ring-white shadow-sm flex items-center justify-center text-slate-400 overflow-hidden">
                                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center shadow-md hover:bg-[#234a2e] transition-colors ring-2 ring-white">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-lg font-semibold text-slate-900">Profile Photo</h3>
                                                <p className="text-sm text-slate-500 mb-3">This will be displayed on your profile.</p>
                                                <button className="text-sm font-medium text-[#2F5233] hover:text-[#234a2e] transition-colors">
                                                    Update Photo
                                                </button>
                                            </div>
                                        </div>

                                        <form className="space-y-8">
                                            {/* Personal Info Group */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="h-6 w-1 bg-[#2F5233] rounded-full"></div>
                                                    <h3 className="text-lg font-medium text-slate-900">Personal Information</h3>
                                                </div>

                                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                                                        <input
                                                            type="text"
                                                            name="first-name"
                                                            id="first-name"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                                                        <input
                                                            type="text"
                                                            name="last-name"
                                                            id="last-name"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
                                                        <input
                                                            type="date"
                                                            name="dob"
                                                            id="dob"
                                                            value={dob}
                                                            onChange={(e) => setDob(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-3">
                                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
                                                        <div className="flex items-center space-x-4 mt-2">
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="gender-male"
                                                                    name="gender"
                                                                    type="radio"
                                                                    checked={gender === "male"}
                                                                    onChange={() => setGender("male")}
                                                                    className="h-4 w-4 border-slate-300 text-[#2F5233] focus:ring-[#2F5233]"
                                                                />
                                                                <label htmlFor="gender-male" className="ml-3 block text-sm font-medium text-slate-700">Male</label>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="gender-female"
                                                                    name="gender"
                                                                    type="radio"
                                                                    checked={gender === "female"}
                                                                    onChange={() => setGender("female")}
                                                                    className="h-4 w-4 border-slate-300 text-[#2F5233] focus:ring-[#2F5233]"
                                                                />
                                                                <label htmlFor="gender-female" className="ml-3 block text-sm font-medium text-slate-700">Female</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* separator */}
                                            <div className="border-t border-slate-100"></div>

                                            {/* Contact Info Group */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="h-6 w-1 bg-[#2F5233] rounded-full"></div>
                                                    <h3 className="text-lg font-medium text-slate-900">Contact Details</h3>
                                                </div>

                                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
                                                        <input
                                                            type="tel"
                                                            name="mobile"
                                                            id="mobile"
                                                            value={mobile}
                                                            onChange={(e) => setMobile(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-6">
                                                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1.5">Residential address</label>
                                                        <textarea
                                                            id="address"
                                                            name="address"
                                                            rows={3}
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-[#2F5233] focus:ring-[#2F5233] sm:text-sm py-2.5 px-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="pt-6 flex items-center justify-end gap-x-4 border-t border-slate-100">
                                                <button type="button" className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-700">Cancel</button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-[#2F5233] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#234a2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5233] transition-colors"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === "password" && (
                                    <div className="p-8">
                                        <div className="flex flex-col gap-1 mb-8">
                                            <h3 className="text-xl font-semibold text-slate-900">Change Password</h3>
                                            <p className="text-sm text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
                                        </div>

                                        <form className="max-w-2xl space-y-6">
                                            <div>
                                                <label htmlFor="current-password" class="block text-sm font-medium leading-6 text-slate-900">Current Password</label>
                                                <div class="mt-2">
                                                    <input
                                                        type="password"
                                                        name="current-password"
                                                        id="current-password"
                                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#2F5233] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="new-password" class="block text-sm font-medium leading-6 text-slate-900">New Password</label>
                                                <div class="mt-2">
                                                    <input
                                                        type="password"
                                                        name="new-password"
                                                        id="new-password"
                                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#2F5233] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="confirm-password" class="block text-sm font-medium leading-6 text-slate-900">Confirm Password</label>
                                                <div class="mt-2">
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        id="confirm-password"
                                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#2F5233] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4 flex items-center justify-end gap-x-4">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-[#2F5233] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#234a2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5233] transition-colors"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
