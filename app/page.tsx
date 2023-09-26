import Footer from "@/components/Server/Shared/Footer";
import Navbar from "@/components/Client/Navbar";
import HeroSection from "@/components/Server/HeroSection";
import DemoForm from "@/components/Client/DemoForm";
import ServiceBenefits from "@/components/Server/ServiceBenefits";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DemoForm />
      <ServiceBenefits />
      <Footer />
    </>
  );
}
