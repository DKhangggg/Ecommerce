import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ACCOUNT_SIDEBAR_ITEMS } from "@/constants/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main>{children}</main>
      <Footer />
    </>
  );
}
