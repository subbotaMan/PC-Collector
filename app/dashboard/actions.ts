"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { categoryIdToDbType, Component } from "@/lib/types";

// Тип для initialState в компоненте save-build-dialog
export type SaveBuildFromState = {
  status: "idle" | "seccess" | "error";
  message?: string;
};

export async function saveBuildAction(
  _prevState: SaveBuildFromState,
  formData: FormData
) {
  const name = String(formData.get("name") ?? "").trim();
  const componentIds = String(formData.get("componentIds"))
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

    const result = await saveBuild(name, componentIds)
}

export async function saveBuild(
  name: string
  componentIds: string[]
): Promise<{success: true; buildId: string} | {success: false; error: string}> {
  const session = auth()
}

// <<<<<< Action для получения компонентов сборки ПК из DB по категории >>>>>>
export async function getComponentsByCategory(
  categoryId: string
): Promise<Component[]> {
  // Нахожу тип категории в DB по callback.
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
