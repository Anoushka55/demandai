import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/lib/userContext";
import { OverrideProvider } from "@/lib/overrideContext";
import { DataProvider } from "@/lib/dataContext";

export const metadata: Metadata = {
  title: "DemandIQ — Autonomous Demand Planning",
  description: "Autonomous Demand & Supply Planning Agent",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy antialiased">
        <DataProvider>
          <UserProvider>
            <OverrideProvider>
              {children}
            </OverrideProvider>
          </UserProvider>
        </DataProvider>
      </body>
    </html>
  );
}
