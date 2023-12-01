import SignUp from "@/components/SignUp";

export default function SignUpPage() {
  return (
    <div className="h-full w-full max-w-[calc(100%-2rem)] self-center rounded-md border border-b-4 bg-primary sm:max-w-md">
      <h4 className="py-3 text-center text-lg font-medium text-secondary">
        Sign-Up
      </h4>
      <hr/>
      <SignUp />
    </div>
  );
}
