import { DefaultSession, DefaultUser } from "next-auth";

// Добавляю поле id в библиотеку next-auth

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// declare module - "Официально заявляю, что я изменяю этот модуль"
// & - "Плюс всё то, что уже есть" (объединение)
// extends - "Беру всё от родителя и добавляю своё" (наследование)
