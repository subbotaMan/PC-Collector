import { auth } from "@/auth";
import { SignupForm } from "@/components/auth/signup-form";
import { redirect } from "next/navigation";

export default async function Page() {
  // Перенаправление на случай, если пользователь уже вошёл.
  const activeSession = await auth();
  if (activeSession?.user) redirect("/dashboard");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
