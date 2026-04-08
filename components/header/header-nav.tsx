"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutList, Plus, Users } from "lucide-react";
import { Btn } from "./button";

type Props = {
  session: Session | null;
};

export function HeaderNav({ session }: Props) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  // На страницах логина и регистрации скрываем навигацию (вкладки)
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
              variant="secondary"
              href="/signup"
              title="Зарегистрироваться"
            />
          )}
          {isSignupPage && (
            <Btn variant="secondary" href="/login" title="Войти" />
          )}
        </div>
      </div>
    );
  }

  // Обычный вид для остальных страниц
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div />

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
          <Btn variant="secondary" href="/login" title="Войти" />
        ) : (
          <Btn variant="ghost" href="/" title="Выйти" size="sm" />
        )}
      </div>
    </div>
  );
}
