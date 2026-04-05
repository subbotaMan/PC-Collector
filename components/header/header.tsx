import Link from "next/link";
import { TypographyH3 } from "../ui/typography-h3";
import { auth } from "@/auth";
import { HeaderNav } from "./header-nav";

export async function Header() {
  const session = await auth();

  return (
    <header className="container mx-auto flex items-center p-4 sm:px-6 lg:px-8">
      <div className="shrink-0">
        <TypographyH3>
          <Link href={session?.user ? "/dashboard" : "/"}>
            Заголовок Header
            {/* {<HeaderNav session={session} />} */}
          </Link>
        </TypographyH3>
      </div>
    </header>
  );
}
