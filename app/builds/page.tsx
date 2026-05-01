"use server";

import { auth } from "@/auth";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { getMyBuilds } from "@/lib/getMyBuilds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/builds-card";

import Image from "next/image";
import bgPage from "../../public/bg/builds-bg.jpg";
import { DeleteBuildButton } from "./components/delete-build-button";
import { deleteBuildAction, setBuildPublicAction } from "./actions/actions";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Check,
  CheckCircle2,
  CheckSquare,
  BadgeCheck,
} from "lucide-react";

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
              {/* КНОПКА УДАЛЕНИЯ БИЛДА */}
              <DeleteBuildButton
                buildId={build.id}
                deleteAction={deleteBuildAction}
              />

              {/* ФОРМА УСТАНОВКИ ПУБЛИЧНЫХ БИЛДОВ */}
              <form action={setBuildPublicAction} className="contents">
                {/* Скрытые input's для отправки данных на сервер. */}
                <input type="hidden" name="buildId" value={build.id} />
                <input
                  type="hidden"
                  name="isPublic"
                  value={build.isPublic ? "false" : "true"}
                />
                {/* КНОПКА УСТАНОВКИ ПУБЛИЧНОСТИ БИЛДА */}
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-lg"
                  className="cursor-pointer"
                  title="Сделать сбоку публичной?"
                >
                  {build.isPublic ? (
                    <BadgeCheck className="text-green-500" />
                  ) : (
                    <Share2 />
                  )}
                </Button>
              </form>
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
