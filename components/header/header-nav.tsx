"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tabs } from "../ui/tabs";

type Props = {
  session: Session;
};

export function HeaderNav({ session }: Props) {
  // Текущий путь.
  const pathname = usePathname();
  // Значение таба.
  const tabValue = getTabValue(pathname);

  // Если пользователь не авторизован.
  if (!session.user) {
    return (
      <div className="flex justify-center">
        <Button variant="secondary">
          <Link href="/login">Войти</Link>
        </Button>
      </div>
    );
  }

  // Если пользователь авторизован.
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div />
      <div className="flex justify-center">
        <Tabs></Tabs>
      </div>
    </div>
  );
}
