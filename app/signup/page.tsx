import { AuthForm } from "@/components/auth/auth-form";

export default function SignupPage() {
  return <AuthForm defaultTab="company" defaultIsSignup={true} />;
}
