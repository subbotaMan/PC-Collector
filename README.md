<h1>Онлайн конструктор ПК</h1>

<h2>Запуск проекта:</h2>

- Склонировать репозиторий.

- Установить зависимости.

- Создать файл .env в корне проекта и добавить в него следующие переменные окружения:
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pcbuilder"
  NEXTAUTH_SECRET='your_pass'
  POSTGRES_USER="postgres"
  POSTGRES_PASSWORD="postgres"
  POSTGRES_DB="pcbuilder"

- Запустить базу данных с помощью Docker Compose:
  docker compose up

- Сгенерировать типы Prisma:
  npx prisma generate

- Создать базу данных и выполнить миграции:
  npx prisma migrate dev

- Заполнить базу данных начальными данными (seed):
  npx prisma db seed

- Запустить проект.

<!-- <h1>Технологии:</h1>
- Next.JS.
- Next Auth.
- TypeScript.
- ORM - Prisma.
- DB - Postgres.
- Среда выполнения контейнеров - Docker.
- Библиотека UI - Shadcn.
- Стили - Tailwind CSS.
- Иконки - Lucide-react.
- Хэширование данных - Bcryptjs. -->

🛠️ Технологический стек
Категория Технология
Фреймворк: https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white
Язык: https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white
ORM: https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white
База данных: https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white
Контейнеризация: https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white
Стилизация: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white
Аутентификация: Next Auth
UI компоненты: Shadcn
Иконки: Lucide-react
Хеширование: Bcryptjs

<h1>Функционал:</h1>
- 🔐 Аутентификация — регистрация и вход в систему
- 🛠️ Конструктор сборок — создание ПК из доступных компонентов
- 🌍 Публичные сборки — возможность делиться своими конфигурациями
- ❤️ Лайк чужих сборок. 
- 🏆 Популярные сборки. 
- ✏️ Редактирование сборки.

🗂️ Структура данных:
Все компоненты для сборки ПК находятся в prisma/seed.ts. Вы можете легко актуализировать или дополнить список комплектующих:

🧠 Процессоры
🎮 Видеокарты
💾 Оперативная память
📦 Материнские платы
⚡ Блоки питания
💿 Накопители
🏠 Корпуса
