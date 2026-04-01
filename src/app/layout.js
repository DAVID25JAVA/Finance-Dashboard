import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-[#0f172a] text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}