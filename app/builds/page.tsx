"use server";

import { auth } from "@/auth";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { getMyBuilds } from "@/lib/getMyBuilds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/builds-card";

import Image from "next/image";
import bgPage from "../../public/bg/builds-bg.jpg";

export default async function MyBuilds() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <TypographyH3>Мои сборки</TypographyH3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {builds.length > 0 ? (
          builds.map((build) => (
            <BuildCard key={build.id} build={build}>
              {/* children */}
            </BuildCard>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Нет сохранённых сборок...</p>
          </div>
        )}
      </div>
    </div>
  );
}
