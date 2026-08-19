import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <div className="bg-red-500 p-10 text-center text-3xl font-bold text-white">
        MARKETING LAYOUT IS WORKING
      </div>

      <Footer />
    </>
  );
}