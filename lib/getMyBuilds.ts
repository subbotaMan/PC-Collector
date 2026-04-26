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
