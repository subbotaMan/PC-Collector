"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Component, ComponentCategory } from "@/lib/types";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  MemoryStick,
  Monitor,
  Server,
  Zap,
  Minus,
  Plus,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddComponentDialogContent } from "./add-component-dialog";
import { TypographyH3 } from "@/components/ui/typography-h3";

// Сопоставление иконки(строка-ключ из моего типа ComponentCategory) категории с иконкой(React-компонент) из lucide-react.
const iconMap: Record<ComponentCategory["icon"], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};

// Тип категории в таблице.
type CategoryRow = {
  id: string;
  name: string;
  icon: string;
};

// Пропсы.
type Props = {
  component: CategoryRow[];
  selectedCategory: Record<string, Component | null>;
  onSelectedComponent: (
    categoryId: string,
    component: Component | null
  ) => void;
};

export function TableParts({
  component,
  selectedCategory,
  onSelectedComponent,
}: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = Object.values(selectedCategory).reduce(
    (acc, currentItem) => acc + (currentItem?.price ?? 0),
    0
  );

  return (
    <Table>
      {/* <<<<<< Заголовок таблицы >>>>>> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Компонент</TableHead>
          <TableHead className="text-center">Тип</TableHead>
          <TableHead className="text-center">Модель</TableHead>
          <TableHead className="text-center">Цена</TableHead>
          <TableHead className="text-center">Действия</TableHead>
        </TableRow>
      </TableHeader>

      {/* <<<<<< Тело таблицы >>>>>> */}
      <TableBody>
        {component.map((category) => {
          const Icon = iconMap[category.icon];
          const selected = selectedCategory[category.id];

          return (
            <TableRow key={category.id} className="text-center">
              {/* <<<<<< Иконка >>>>> */}
              <TableCell>
                <span className="flex items-center" title={category.icon}>
                  <Icon className="h-5 w-5 mr-1" />
                </span>
              </TableCell>

              {/* <<<<<< Название >>>>>> */}
              <TableCell className="font-bold text-center">
                {category.name}
              </TableCell>

              {/* <<<<<< Модель >>>>>> */}
              <TableCell className="text-center">
                {selected?.name ?? (
                  <span
                    title="Не выбрано"
                    className="flex justify-center items-center"
                  >
                    <Minus />
                  </span>
                )}
              </TableCell>

              {/* <<<<<< Цена >>>>>> */}
              <TableCell className="text-center">
                {selected?.price ?? (
                  <span
                    title="Цена отсутствует"
                    className="flex justify-center items-center"
                  >
                    <Minus />
                  </span>
                )}
              </TableCell>

              {/* <<<<<< Модальное окно с действием >>>>>> */}
              <TableCell className="text-center">
                <Dialog
                  // Открываю, если локальный state соответствует выбранной категории.
                  open={openCategoryId === category.id}
                  // Устанавливаю локальный state конкретной категории если модалка открыта.
                  onOpenChange={(open) =>
                    setOpenCategoryId(open ? category.id : null)
                  }
                >
                  {/* <<<<<< Кнопка "Изменить" - "Добавить" >>>>>> */}
                  <DialogTrigger asChild>
                    <Button
                      className="hover-lift p-4"
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {selected ? "Изменить" : "Добавить"}
                    </Button>
                  </DialogTrigger>

                  {/* <<<<<< Модальное окно со списком доступных компонентов сборки >>>>>> */}
                  <AddComponentDialogContent
                    categoryId={category.id}
                    categoryName={category.name}
                    onSelect={(component) => {
                      onSelectedComponent(category.id, component);
                      setOpenCategoryId(null);
                    }}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      {/* <<<<<< Подвал таблицы с ценой сборки >>>>>> */}
      {totalPrice > 0 && (
        <TableFooter>
          <TableRow>
            {/* Растягиваю ячейку на 5 столбцов */}
            <TableCell colSpan={5}>
              <TypographyH3>Цена сборки:</TypographyH3>
              <p className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                {totalPrice}
              </p>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
