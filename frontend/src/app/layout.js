import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata = {
  title: "CivicSense AI",
  description: "Understand government notices & discover your entitlements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dmSerif.variable} font-sans bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
