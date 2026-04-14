"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TableParts } from "./table";
import { componentCategories } from "@/lib/constants";

export const CurrentBuild = () => {
  // Хранилище. Ключ — ID категории, Значение — выбранный компонент (Component) или null.
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, Component | null>
  >({});

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  // Обработчик события выбора.
  const onSelectComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedCategories((prev) => ({ ...prev, [categoryId]: component }));
    },
    []
  );

  return (
    <>
      <div className="flex-justify-between mb-8">
        <TypographyH1>Собери свою сборку</TypographyH1>
        <Button
          size="lg"
          className="hover-lift bg-blue-500 px-4"
          onClick={() => setSaveDialogOpen(true)}
        >
          Собрать
        </Button>
      </div>

      <div className="min-w-0 overflow-x-auto">
        <TableParts
          component={componentCategories} // Константа с массивом объектов в constants.ts.
          onSelectedComponent={onSelectComponent} // Обработчик события выбора.
          selectedByCategory={selectedCategories} // Объект выбранных категорий.
        />
      </div>
    </>
  );
};
