"use server";

import { prisma } from "@/lib/db";
import { categoryIdToDbType, Component } from "@/lib/types";

export async function getComponentsByCategory(
  categoryId: string
): Promise<Component[]> {
  // Нахожу тип в DB по callback.
  const dbType = categoryIdToDbType[categoryId];

  // Guard expression.
  if (!dbType) {
    return [];
  }

  // Нахожу все компоненты в DB по dbType.
  const components = await prisma.component.findMany({
    where: { type: dbType },
    // Сортировка по price, 'asc' - правила сортировки по возрастанию.
    orderBy: { price: "asc" },
  });

  // Возвращаю массив найденных компонентов.
  return components.map((component) => ({
    id: component.id,
    name: component.name,
    price: component.price,
    type: component.type,
    socket: component.socket,
  }));
}
