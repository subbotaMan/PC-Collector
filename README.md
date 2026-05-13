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

<hr/>

<h1>🛠️ Технологический стек:</h1>
- Next.JS. <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white" />
- Next Auth.
- TypeScript.
- ORM - Prisma.
- DB - Postgres.
- Среда выполнения контейнеров - Docker.
- Библиотека UI - Shadcn.
- Стили - Tailwind CSS.
- Иконки - Lucide-react.
- Хэширование данных - Bcryptjs.

<h1>Функционал:</h1>
- 🔐 Аутентификация — регистрация и вход в систему
- 🛠️ Конструктор сборок — создание ПК из доступных компонентов
- 🌍 Публичные сборки — возможность делиться своими конфигурациями
- ❤️ Лайк чужих сборок. 
- 🏆 Популярные сборки. 
- ✏️ Редактирование сборки.

<h1>🗂️ Структура данных:</h1>
<p>Все компоненты для сборки ПК находятся в prisma/seed.ts. Вы можете легко актуализировать или дополнить список комплектующих:</p>
🧠 Процессоры

🎮 Видеокарты

💾 Оперативная память

📦 Материнские платы

⚡ Блоки питания

💿 Накопители

🏠 Корпуса
