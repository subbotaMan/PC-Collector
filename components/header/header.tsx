"use server";

import Link from "next/link";
import { TypographyH3 } from "../ui/typography-h3";
import { auth } from "@/auth";
import { HeaderNav } from "./header-nav";
import { PcCase, PcCaseIcon } from "lucide-react";

export async function Header() {
  const session = await auth();

  return (
    <header className="container mx-auto flex items-center p-4">
      <div className="shrink-0">
        <TypographyH3>
          <Link
            className="flex items-center gap-2"
            href={session?.user ? "/dashboard" : "/"}
          >
            ПК Сборщик <PcCase />
          </Link>
        </TypographyH3>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
}
