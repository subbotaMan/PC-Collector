"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutList, LogOut, Plus, Users } from "lucide-react";
import { Btn } from "../Btn&Link";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export function HeaderNav({ session }: Props) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  // Handler для выхода из системы.
  const handleLogout = async () => {
    await signOut({
      redirect: true,
    });
  };

  // На страницах логина и регистрации скрываю навигацию.
  if (isLoginPage || isSignupPage) {
    return (
      <div className="grid grid-cols-3 items-center gap-4">
        {/* Пустой див для сетки grid */}
        <div />
        <div className="flex justify-center" />

        {/* Кнопка входа/регистрации */}
        <div className="flex justify-end">
          {isLoginPage && (
            <Btn
              className="hover-lift bg-[#e11d48]"
              variant="secondary"
              href="/signup"
              title="Зарегистрироваться"
            />
          )}
          {isSignupPage && (
            <Btn
              className="hover-lift bg-[#e11d48]"
              variant="secondary"
              href="/login"
              title="Войти"
            />
          )}
        </div>
      </div>
    );
  }

  // Обычный вид для остальных страниц.
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      {/* Пустой див для сетки grid */}
      <div />
      {/* Табы для авторизованных пользователей. */}
      <div className="flex justify-center">
        {session?.user && (
          <Tabs value={tabValue} className="w-fit">
            <TabsList>
              <TabsTrigger value="dashboard" asChild>
                <Link href="/dashboard">
                  <Plus className="w-4 h-4" />
                  Создать сборку
                </Link>
              </TabsTrigger>

              <TabsTrigger value="builds" asChild>
                <Link href="/builds">
                  <LayoutList className="w-4 h-4" />
                  Мои сборки
                </Link>
              </TabsTrigger>

              <TabsTrigger value="explore" asChild>
                <Link href="/builds/explore">
                  <Users className="w-4 h-4" />
                  Публичные сборки
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="flex justify-end">
        {!session?.user ? (
          // Кнопка для главной страницы если пользователь авторизован/не авторизован.

          // Не авторизован.
          <Btn
            className="hover-lift bg-[#f59e0b] hover:bg-[#d97706]"
            variant="secondary"
            href="/login"
            title="Войти"
          />
        ) : (
          // Авторизован.
          <div className="flex flex-row gap-5 items-center">
            <p className="text-[#e2e8f0] font-medium tracking-wide">
              {session.user.name}
            </p>
            <span title="Выйти из аккаунта">
              <LogOut
                onClick={handleLogout}
                className="text-white-900 hover:text-red-700 hover:scale-140 cursor-pointer transition-all duration-400"
                // size={20}
                // strokeWidth={1.8}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
