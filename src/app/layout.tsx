import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Rate My Build",
  description: "Rate, roast, improve, and find teammates for your builds.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Top Navigation */}
        <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-cyan-400">
              RateMyBuild
            </Link>

            <div className="flex items-center gap-6 text-sm">
              <Link href="/community" className="hover:text-cyan-400">
                Community
              </Link>
              <Link href="/lfg" className="hover:text-cyan-400">
                LFG
              </Link>
              <Link
                href="/submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Submit Build
              </Link>
              <Link href="/profile" className="hover:text-cyan-400">
                Profile
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}