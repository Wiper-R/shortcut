import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Shared/HeroSection";
import DemoForm from "@/components/DemoForm";
import ServiceBenefits from "@/components/Shared/ServiceBenefits";
import AuthValidator from "@/components/AuthValidator";

export default function Home() {
  return (
    <AuthValidator redirectAuthenticated="/dashboard/">
      <Navbar />
      <HeroSection />
      <DemoForm />
      <ServiceBenefits />
      <Footer />
    </AuthValidator>
  );
}
