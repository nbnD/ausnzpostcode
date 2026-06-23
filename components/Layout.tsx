import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-ash text-text">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
