import SignIn from "@/components/SignIn";

export default function SignInPage() {
  return (
    <div className="h-full w-full max-w-[calc(100%-2rem)] self-center rounded-md border border-b-4 sm:max-w-md bg-primary">
      <h4 className="py-3 text-center text-lg font-medium text-secondary">
        Sign-In
      </h4>
      <hr/>
      <SignIn />
    </div>
  );
}
