import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QB Draft Analysis",
  description: "2025 QB Draft Analysis and Comparisons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Player Comps
                </a>
                <a href="/grades" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Draft Grades
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}