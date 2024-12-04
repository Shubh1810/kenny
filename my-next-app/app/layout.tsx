import type { Metadata } from "next";
import "@/styles/globals.css";
import { Sidebar } from "./components/ui/Sidebar";


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
    <html lang="en">
      <body className="bg-gradient-to-bl from-[#000238] via-[#000238] via-[#1c0018] to-[#140405] min-h-screen">
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
