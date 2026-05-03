import { prisma } from "./db";

// <<<<<< Получаю все сборки builds конкретного пользователя из базы данных >>>>>>
export async function getMyBuilds(userId: string) {
  return prisma.build.findMany({
    // Ищу сборки по userId.
    where: { userId },
    // Сортировка - сначала новые сборки.
    orderBy: { createdAt: "desc" },
    // Подгрузка связанных данных из других таблиц в DB.
    include: {
      // Данные пользователя.
      user: { select: { email: true } },
      // Компоненты сборки.
      components: {
        include: {
          // Загружаю сам компонент.
          component: {
            // И забираю из него только нужные поля.
            select: { name: true, type: true, price: true },
          },
        },
      },
    },
  });
}

// <<<<<< Получаю все публичные сборки из базы данных >>>>>>
export function getPublicBuilds(userId: string) {
  return prisma.build.findMany({
    // Ищу сборки по isPublic.
    where: { isPublic: true },
    // Сортировка - сначала новые сборки.
    orderBy: { createdAt: "desc" },
    // Подгрузка связанных данных из других таблиц в DB.
    include: {
      // Данные пользователя.
      user: { select: { email: true, name: true } },
      // Компоненты сборки.
      components: {
        include: {
          // Загружаю сам компонент.
          component: {
            // И забираю из него только нужные поля.
            select: { name: true },
          },
        },
      },
      // Виртуальное поле созданное prisma для подсчёта записей в таблице likes, связанных с этой сборкой.
      _count: { select: { likes: true } },
      // Нахожу поставленные лайки.
      likes: { where: { userId }, select: { id: true } },
    },
  });
}

// <<<<<< Получаю редактируемый build >>>>>>
export async function getBuildToEdit(buildId: string) {
  return prisma.build.findFirst({
    where: { id: buildId },
    include: {
      components: {
        include: { component: true },
      },
    },
  });
}
