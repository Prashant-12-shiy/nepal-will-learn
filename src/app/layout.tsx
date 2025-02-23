import type { Metadata } from "next";
import { Poppins, Great_Vibes } from "next/font/google"; // Import Poppins and Great_Vibes

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/context/query-provider";

// Configure Poppins
const poppins = Poppins({
  weight: "400", // Regular weight
  subsets: ["latin"],
});

// Configure Great Vibes
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={poppins.className}>
        <QueryProvider>
          <Toaster position="top-right"/>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}