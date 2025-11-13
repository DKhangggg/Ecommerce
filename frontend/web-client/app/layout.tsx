import { AuthProvider } from "@/context/AuthProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMock = process.env.NODE_ENV === "development";

  return (
    <html lang="en">
      <body>
        <AuthProvider mock={isMock}>{children}</AuthProvider>
      </body>
    </html>
  );
}
