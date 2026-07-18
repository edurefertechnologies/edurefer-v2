import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({
  children,
}: PageWrapperProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}