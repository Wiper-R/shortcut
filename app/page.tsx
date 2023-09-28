import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Shared/HeroSection";
import DemoForm from "@/components/DemoForm";
import ServiceBenefits from "@/components/Shared/ServiceBenefits";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard redirectAuthenticated="/dashboard/">
      <Navbar />
      <HeroSection />
      <DemoForm />
      <ServiceBenefits />
      <Footer />
    </AuthGuard>
  );
}
