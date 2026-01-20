import "./globals.css";

export const metadata = {
  title: "CivicSense AI",
  description: "Understand government notices & discover your entitlements",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
