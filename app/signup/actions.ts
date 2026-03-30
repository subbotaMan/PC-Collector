"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const MIN_PASS_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export type SignupState = { error?: string };

// <<<<<<<<<<<<<<<<<<Функция, которая вызывается при отправке формы в DB>>>>>>>>>>>>>>>>>>>>>>>>>>
export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  // Данные input's, которые забираю из полей компонента signup-form.
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  // Guard Clauses
  if (!name) {
    return { error: "Введите имя" };
  }

  if (!email) {
    return { error: "Введите email" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Некорректный формат электронной почты" };
  }

  if (!password || password.length < MIN_PASS_LENGTH) {
    return { error: "Пароль должен быть не менее 8 символов!" };
  }

  // Проверка существования email в DB
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Email уже используется" };
  }

  // Хэширование пароля. Длинна соли - 10.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Записываю пользователя в DB
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}
