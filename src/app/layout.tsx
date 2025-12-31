import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Rate My Build",
  description: "Rate, roast, improve, and find teammates for your builds.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Top Navigation - New Navbar with Profile Dropdown */}
        <Navbar />

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}