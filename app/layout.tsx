import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "Saitama",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${poppins.variable} antialiased`}
        style={{ height: "100vh" }} // ensure full viewport height
      >
        <main className="flex-grow overflow-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
