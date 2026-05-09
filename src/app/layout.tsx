import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SONICWAVE PRO | Uncompromised Precision",
  description: "Experience the next generation of premium wireless headphones. Engineered for impact, calibrated for silence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="antialiased bg-deep-black selection:bg-red-highlight selection:text-white">
        {children}
      </body>
    </html>
  );
}
