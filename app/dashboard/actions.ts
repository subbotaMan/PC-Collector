"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { categoryIdToDbType, Component } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Тип для initialState в компоненте save-build-dialog
export type SaveBuildFromState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function saveBuildAction(
  _prevState: SaveBuildFromState,
  formData: FormData
): Promise<SaveBuildFromState> {
  // Достаю и очищаю название сборки.
  const name = String(formData.get("name") ?? "").trim();

  // Получаю строку с ID компонентов, разбиваю в массив, убираю пустые значения.
  const componentIds = String(formData.get("componentIds"))
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  // Пытаюсь сохранить сборку в БД.
  const result = await saveBuild(name, componentIds);

  // Если что-то пошло не так — возвращаю ошибку для формы.
  if (!result.success) {
    return {
      status: "error",
      message: result.error,
    };
  }

  // Всё хорошо — сообщаю об успехе.
  return {
    status: "success",
    message: "Сборка успешно сохранена!",
  };
}

export async function saveBuild(
  name: string,
  componentIds: string[]
): Promise<
  { success: true; buildId: string } | { success: false; error: string }
> {
  const session = await auth();

  // <<<<<< Guard Expression >>>>>>
  if (!session) {
    return { success: false, error: "Необходимо авторизоваться" };
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    return { success: false, error: "Введите название сборки" };
  }

  if (componentIds.length <= 0) {
    return { success: false, error: "Добавьте хотя бы один компонент" };
  }

  const components = await prisma.component.findMany({
    where: {
      id: { in: componentIds },
    },
  });

  if (components.length !== componentIds.length) {
    return { success: false, error: "Некоторые компоненты не найдены" };
  }

  // Считаю итоговую стоимость сборки.
  const totalPrice = components.reduce(
    (acc, component) => acc + component.price,
    0
  );

  try {
    const build = await prisma.$transaction(async (tx) => {
      // tx — это тот же Prisma-клиент, но привязанный к текущей транзакции. Все запросы через tx идут в рамках этой транзакции.
      const newBuild = await tx.build.create({
        data: {
          name: trimmedName,
          totalPrice,
          userId: session.user.id,
        },
      });

      await tx.buildComponent.createMany({
        data: componentIds.map((componentId) => ({
          buildId: newBuild.id,
          componentId,
        })),
      });

      return newBuild;
    });

    // Обновляю кеш страниц, где отображается список сборок.
    revalidatePath("/dashboard");
    revalidatePath("/builds");

    return { success: true, buildId: build.id };
  } catch (error) {
    return { success: false, error: "Ошибка... Не удалось создать сборку." };
  }
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
