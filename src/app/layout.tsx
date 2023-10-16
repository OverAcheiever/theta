import { Provider } from "@/components/wallet/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const inter = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="w-full h-[100svh] flex justify-center">
            <div className="w-full h-full border-x border-x-[#111] max-w-lg">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
