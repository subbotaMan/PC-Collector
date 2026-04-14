"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
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
  selectedByCategory: Record<string, Component | null>;
  onSelectedComponent: (
    categoryId: string,
    component: Component | null
  ) => void;
};

export function TableParts({
  component,
  selectedByCategory,
  onSelectedComponent,
}: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const totalPrice = Object.values(selectedByCategory).reduce(
    (acc, currentItem) => acc + (currentItem?.price ?? 0),
    0
  );

  return (
    <Table>
      {/* <<<<<< Заголовок таблицы >>>>>> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Компонент</TableHead>
          <TableHead className="pl-7">Тип</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead className="text-right pr-10">Действия</TableHead>
        </TableRow>
      </TableHeader>

      {/* <<<<<< Тело таблицы >>>>>> */}
      <TableBody>
        {component.map((category) => {
          const Icon = iconMap[category.icon];
          const selected = selectedByCategory[category.id];

          return (
            <TableRow key={category.id} className="my-2">
              {/* <<<<<< Иконка >>>>> */}
              <TableCell>
                <span className="flex items-center" title={category.icon}>
                  <Icon className="h-5 w-5 mr-1" />
                </span>
              </TableCell>

              {/* <<<<<< Название >>>>>> */}
              <TableCell className="font-bold pl-2">{category.name}</TableCell>

              {/* <<<<<< Модель >>>>>> */}
              <TableCell>
                {selected?.name ?? (
                  <span title="Не выбрано">
                    <Minus />
                  </span>
                )}
              </TableCell>

              {/* <<<<<< Цена >>>>>> */}
              <TableCell>
                {selected?.price ?? (
                  <span title="Цена отсутствует">
                    <Minus />
                  </span>
                )}
              </TableCell>

              {/* <<<<<< Модальное окно с действием >>>>>> */}
              <TableCell className="text-right">
                <Dialog
                  // Открываю, если локальный state соответствует выбранной категории.
                  open={openCategoryId === category.id}
                  // Устанавливаю локальный state конкретной категории если модалка открыта.
                  onOpenChange={(open) =>
                    setOpenCategoryId(open ? category.id : null)
                  }
                >
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
    </Table>
  );
}
