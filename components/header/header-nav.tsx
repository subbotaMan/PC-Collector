"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutList, Plus, Users } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export function HeaderNav({ session }: Props) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);
  const isLoginPage = pathname === "/login";

  // На странице логина - пустота.
  if (isLoginPage) return null;

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      {/* Пустой див для сетки grid */}
      <div />

      <div className="flex justify-center">
        {/* Если пользователь авторизован - показать навигацию в header. */}
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

      {/* Если пользователь авторизован - кнопка "войти". Иначе - "выйти" */}
      <div className="flex justify-end">
        {!session?.user ? (
          <Button variant="secondary" asChild>
            <Link href="/login">Войти</Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ redirectTo: "/" })}
          >
            Выйти
          </Button>
        )}
      </div>
    </div>
  );
}
