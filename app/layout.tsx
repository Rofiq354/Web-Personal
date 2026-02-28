import type { Metadata } from "next";
import { Playfair_Display, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InitialLoader } from "@/components/initial-loader";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const { data: configs } = await supabase.from("site_config").select("*");
    const configMap = Object.fromEntries(
      (configs || []).map((c) => [c.key, c.value]),
    );
    return {
      title: configMap.meta_title || "Portfolio",
      description: configMap.meta_description || "Developer Portfolio",
    };
  } catch {
    return {
      title: "Portfolio",
      description: "Developer Portfolio",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sora.variable} ${jetbrains.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <InitialLoader />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
