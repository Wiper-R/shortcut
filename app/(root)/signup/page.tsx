import AuthGuard from "@/components/AuthValidator";
import Footer from "@/components/Shared/Footer";
import PlainNavbar from "@/components/Shared/PlainNavbar";
import SignupForm from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <AuthGuard redirectAuthenticated="/dashboard/">
      <PlainNavbar />
      <SignupForm />
      <Footer />
    </AuthGuard>
  );
}
