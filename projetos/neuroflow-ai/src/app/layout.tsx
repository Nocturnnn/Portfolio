import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroFlow AI — Automação Inteligente",
  description:
    "Transforme ideias em execução com IA. Automatize fluxos de trabalho e escale sua produtividade com inteligência artificial.",
  keywords: ["AI", "SaaS", "Automation", "Artificial Intelligence"],
  authors: [{ name: "Mateus Vitor" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0B0F19] text-[#E5E7EB] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
