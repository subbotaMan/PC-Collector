"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// То, что возвращает loginAction.
export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  // Данные input's, которые забираю из полей компонента signup-form через поле name.
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password"));

  if (!email || !password) {
    return { error: "Введите email или пароль" };
  }

  try {
    // Вызов функции authorize(проверка личности) из @auth.ts.
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        console.log(error);
        return { error: "Неверный email или пароль" };
      }

      return { error: "Ошибка авторизации" };
    }

    throw error;
  }
}
