import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularBuilds } from "@/lib/getMyBuilds";
import { Eye, Pencil, ThumbsUp } from "lucide-react";
import Link from "next/link";

export async function PopularBuildCard() {
  const popularBuilds = await getPopularBuilds(3);

  if (popularBuilds.length === 0) {
    return (
      <Card className="w-full shrink-0 lg:w-64">
        <CardHeader>
          <CardTitle className="text-center">Популярные сборки</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Пока нет сборок...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shrink-0 lg:w-64">
      <CardHeader>
        <CardTitle className="text-center">Популярные сборки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {popularBuilds.map((build) => (
          <div
            key={build.id}
            className="flex flex-col gap-1 rounded-lg border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm leading-tight min-w-0 text-[#FFB347]">
                {build.name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                asChild
              >
                <Link
                  href={`/builds/${build.id}/edit`}
                  title="Редактировать сборку сборку"
                >
                  <Pencil className="!h-5 !w-5" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="tabular-nums  text-orange-600 text-2xl font-bold">
                {new Intl.NumberFormat("ru-Ru").format(build.totalPrice)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {build._count.likes}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
