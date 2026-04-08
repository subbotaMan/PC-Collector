import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import bg from "../../public/bg/bg-register.jpg";

export default async function Page() {
  const activeSession = await auth();
  if (activeSession?.user) redirect("/dashboard");

  return (
    <div
      className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      style={{
        backgroundImage: `url(${bg.src}), linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative z-10 w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
