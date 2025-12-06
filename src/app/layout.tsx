import type React from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/cn";
import NextThemeProvider, {
  NextThemeTrigger,
} from "@/providers/NextThemeProvider";
import Box from "@/components/Box";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Box
        as="body"
        className={cn(poppins.variable, "w-screen h-screen antialiased")}
      >
        <NextThemeProvider>
          {children}

          <NextThemeTrigger />
        </NextThemeProvider>
      </Box>
    </html>
  );
}
