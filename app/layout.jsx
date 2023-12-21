import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./parts/Footer";
import NavigationMenuDemo from "./parts/Nav";
import Wrapper from "./parts/Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto",
  description: "Crypto Screener",
};

export default function RootLayout({ children }) {
  return (
    <Wrapper>
      <html lang="en">
        <body className={`${inter.className} dark`}>
          <NavigationMenuDemo />
          {children} <Footer />
        </body>
      </html>
    </Wrapper>
  );
}
