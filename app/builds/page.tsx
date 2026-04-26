"use server";

import { auth } from "@/auth";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { getMyBuilds } from "@/lib/getMyBuilds";
import { redirect } from "next/navigation";

export default async function MyBuilds() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="py-6">
      <TypographyH3>Мои сборки</TypographyH3>
      <br />
      {builds.length > 0 ? (
        builds.map((build) => {
          return <div className=""></div>;
        })
      ) : (
        <p className="text-muted-foreground">Нет сохранённых сборок...</p>
      )}
    </div>
  );
}
