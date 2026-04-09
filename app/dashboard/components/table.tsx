"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
} from "lucide-react";
import { useState } from "react";

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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Компонент</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}
