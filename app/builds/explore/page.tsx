import { auth } from "@/auth";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { getPublicBuilds } from "@/lib/getMyBuilds";
import { notFound } from "next/navigation";
import { BuildCard } from "../components/builds-card";
import { toggleLikeAction } from "../actions/actions";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

export default async function ExplorePage() {
  const session = await auth();

  // Неавторизован? 404 page.
  if (!session?.user.id) notFound();

  // Получаю публичные билды.
  const builds = await getPublicBuilds(session.user.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <TypographyH1>Публичные сборки</TypographyH1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {builds.length > 0 ? (
          builds.map((build) => {
            const isLiked =
              Array.isArray(build.likes) && build.likes.length > 0;

            // <<<<<< КАРТОЧКИ ВСЕХ ПУБЛИЧНЫХ СБОРОК >>>>>>
            return (
              <BuildCard build={build} key={build.id}>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleLikeAction} className="contents">
                    {/* СКРЫТЫЙ INPUT */}
                    <input type="hidden" name="buildId" value={build.id} />

                    {/* КНОПКА LIKE */}
                    <Button
                      className="cursor-pointer group/like"
                      type="submit"
                      variant={isLiked ? "outline" : "secondary"}
                      size="lg"
                    >
                      {/* ИКОНКА LIKE */}
                      <ThumbsUp
                        className={`!h-5 !w-5 mr-1 transition-transform duration-300 ease-in-out group-hover/like:animate-pulse group-hover/like:rotate-12 ${
                          isLiked ? "fill-current" : ""
                        }`}
                      />

                      {/* СЧЁТЧИК ЛАЙКОВ */}
                      {build._count.likes}
                    </Button>
                  </form>
                </div>
              </BuildCard>
            );
          })
        ) : (
          // <<<<<< ПУБЛИЧНЫХ СБОРОК НЕТ >>>>>>
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-center mb-6">
              Нет публичных сборок...
            </p>
            <img
              src="/notFound.png"
              alt="Публичные сборки не найдены"
              className="max-w-md w-full mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
