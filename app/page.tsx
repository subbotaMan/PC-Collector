import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import Link from "next/link";
import Image from "next/image";
import bgPage from "../public/bg/bg-notebook.jpg";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Фоновое изображение */}
      <Image
        src={bgPage}
        alt="Background"
        sizes="100vw"
        fill // Заставляет изображение заполнять родительский контейнер
        priority // Говорит Next.js загрузить изображение немедленно
        className="object-cover" // object-cover = заполнит весь контейнер, обрезая края
        quality={85} // Качество сжатия от 1 до 100
        placeholder="blur" // Показывает размытую версию во время загрузки
      />

      {/* Затемнение для читаемости текста (опционально) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Контент поверх фона */}
      <div className="relative z-10 flex items-center justify-center">
        <main className="flex flex-col items-center py-32 px-16">
          <TypographyH1>Создай сборку своей мечты</TypographyH1>
          <br />
          <Button>
            <Link href="/dashboard">Создать</Link>
          </Button>
        </main>
      </div>
    </div>
  );
}
