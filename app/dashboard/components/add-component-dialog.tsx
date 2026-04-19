"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";
import { getComponentsByCategory } from "../actions";
import { Preloader } from "@/lib/preloader";

type Props = {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
};

export function AddComponentDialogContent({
  categoryId,
  categoryName,
  onSelect,
}: Props) {
  // Local State
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаю массив компонентов по категории из DB.
  useEffect(() => {
    // Таймаут на 20 секунд.
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Что-то пошло не так...");
      }
    }, 20000);

    // Запрос данных с помощью action.
    getComponentsByCategory(categoryId)
      .then((data) => {
        clearTimeout(timeoutId);
        setComponents(data);
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        setLoading(false);
        setError("Что-то пошло не так...");
      });

    // Очистка таймаута при размонтировании.
    return () => clearTimeout(timeoutId);
  }, [categoryId]);

  // Обработчик повторной попытки.
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setComponents([]);

    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Что-то пошло не так...");
      }
    }, 20000);

    getComponentsByCategory(categoryId)
      .then((data) => {
        clearTimeout(timeoutId);
        setComponents(data);
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error("Ошибка загрузки компонентов:", err);
        setLoading(false);
        setError("Что-то пошло не так...");
      });
  };

  return (
    // w-[90vw] - мобильная ширина. md:w-[60vw] - ширина десктопов.
    <DialogContent className="flex flex-col !max-w-6xl w-[90vw] md:w-[60vw] max-h-[95vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle>Добавить компонент - {categoryName}</DialogTitle>
        {/* Описание для скринридера */}
        <DialogDescription>
          Выберите компонент из категории для добавления в сборку
        </DialogDescription>
      </DialogHeader>

      <div className="overflow-y-auto flex-1 mx-1 px-1">
        {loading ? (
          <Preloader />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Попробовать снова
            </button>
          </div>
        ) : components.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <ComponentCard
                key={c.id}
                name={c.name}
                price={c.price}
                onClick={() => onSelect(c)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm py-4">
            Нет доступных компонентов
          </p>
        )}
      </div>
    </DialogContent>
  );
}
