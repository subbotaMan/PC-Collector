import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Pencil } from "lucide-react";
import Link from "next/link";

type BuildCard = {
  user: {
    email: string;
  };
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{
    id: string;
    component: {
      name: string;
    };
  }>;
};

type Props = {
  build: BuildCard;
  children?: React.ReactNode;
};

export function BuildCard({ build, children }: Props) {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-amber-500/50 group">
      {/* <<<<<< HEADER >>>>>> */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          {/* Левая часть: название и автор */}
          <div className="min-w-0 flex-1">
            <CardTitle className="mb-1">
              <TypographyH3 className="break-words hyphens-auto">
                {build.name}
              </TypographyH3>
            </CardTitle>
            <p
              className="text-xs text-muted-foreground truncate"
              title={build.user?.email}
            >
              Создал: {build.user?.email?.trim() || "Не указан"}
            </p>
          </div>

          {/* Правая часть: кнопка */}
          <div className="shrink-0">
            <Button
              size="icon"
              variant="outline"
              className="transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href={`builds/${build.id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* <<<<<< CONTENT >>>>>> */}
      <CardContent className="flex-1 pt-0">
        {build.components?.length > 0 ? (
          <>
            <p className="text-sm font-medium mt-2 mb-1">Компоненты:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
              {build.components.map((component) => (
                <li
                  key={component.id}
                  className="truncate hover:text-foreground transition-colors duration-200"
                >
                  {component.component?.name || "Без названия"}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-sm text-muted-foreground mt-2">Нет компонентов</p>
        )}
      </CardContent>

      {/* <<<<<< FOOTER >>>>>> */}
      <CardFooter className="flex flex-col items-stretch gap-3 pt-4 border-t transition-colors duration-200 group-hover:border-primary/30">
        <div className="flex flex-row justify-between items-start gap-2 flex-wrap">
          {/* Цена */}
          <span className="font-extrabold text-4xl bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-110 hover:from-amber-600 hover:to-orange-700 inline-block">
            {new Intl.NumberFormat("ru-RU").format(build.totalPrice)} ₽
          </span>

          {/* Дата */}
          {build.createdAt && (
            <p className="text-xs text-muted-foreground shrink-0">
              {new Intl.DateTimeFormat("ru-RU").format(
                new Date(build.createdAt)
              )}
            </p>
          )}
        </div>

        {/* Дополнительный контент (children) */}
        {children && (
          <div className="flex flex-row gap-2 flex-wrap">{children}</div>
        )}
      </CardFooter>
    </Card>
  );
}
