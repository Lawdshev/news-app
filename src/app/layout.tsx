import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./fragments/header";
import Providers from "./providers/theme-provider";
import { UserAuthContextProvider } from "./providers/user-auth-context-provider";
import { FavouriteProvider } from "./hooks/favourite";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className="bg-gray-100
       dark:bg-zinc-900 transition-all-duration-700"
      >
        <Providers>
          <UserAuthContextProvider initialState={null}>
            <FavouriteProvider>
              <Header />
              <div className="max-w-6xl mx-auto">{children}</div>
            </FavouriteProvider>
          </UserAuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
