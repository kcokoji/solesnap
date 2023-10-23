import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToasterContext from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";

const Roboto = Roboto_Mono({ subsets: ["cyrillic"] });

export const metadata = {
  title: "SoleSnap",
  description: "The premier e-commerce destination where style meets luxury.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className={Roboto.className}>
        <ToasterContext />
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}
