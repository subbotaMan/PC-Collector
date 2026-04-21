import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// <<<<<<<<< Настройка Next Auth >>>>>>>>>
export const { auth, signIn, signOut, handlers } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // providers. Кто может войти. Только через логин и пароль.
    Credentials({
      // Credentials. Какие данные нужны для входа. Email и password.
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Пароль",
          type: "password",
        },
      },

      // Проверка личности.
      async authorize(credentials) {
        // Проверяю, что email и password прислали.
        if (!credentials?.email || typeof credentials.email !== "string") {
          return null;
        }

        if (
          !credentials?.password ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        // Нахожу актуального пользователя в DB.
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.password) {
          return null;
        }

        // Проверяю пароль, который прислал пользователь с зашифрованным паролем в DB.
        const valid = await bcrypt.compare(
          credentials.password,
          user?.password
        );

        // Если всё ок - пускаю, если нет - возвращаю null.
        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  // Когда пользователь вошел, даю ему JWT токен. С этим пропуском он может ходить по сайту, не вводя пароль каждый раз.
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Жизнь токена сутки
    updateAge: 60 * 60, // Обновляю токен каждый час, если пользователь активен
  },

  // Если пользователь не залогинен и пытается зайти на защищенную страницу - отправляю его на страницу /login.
  pages: {
    signIn: "/login",
  },

  callbacks: {
    // Какие данные кладу в JWT пропуск пользователя.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },

    // Данные о себе, которые видит пользователь.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
      }

      return session;
    },
  },
});

//    Пользователь → вводит email/пароль
//                 ↓
//      [authorize] проверяет в базе
//                 ↓
//           Всё правильно?
//             /        \
//           Да         Нет
//            ↓          ↓
//         Выдаею JWT   Отказ
//                 ↓
// Пользователь гуляет по сайту с JWT в кармане
