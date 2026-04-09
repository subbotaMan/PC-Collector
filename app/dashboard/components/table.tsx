"use-client";

import { Component } from "@/lib/types";

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
}: Props) {}
