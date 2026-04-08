import { auth } from "@/auth";
import { SignupForm } from "@/components/auth/signup-form";
import { redirect } from "next/navigation";
import bg from "../../public/bg/bg-auth.jpg";

export default async function Page() {
  // Перенаправление на случай, если пользователь уже вошёл.
  const activeSession = await auth();
  if (activeSession?.user) redirect("/dashboard");

  return (
    <div
      className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      style={{
        backgroundImage: `url(${bg.src}), linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(126, 55, 55, 0.4) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
