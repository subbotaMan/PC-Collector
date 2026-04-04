import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Коллекция публичных маршрутов, доступных без авторизации.
const PUBLIC_PATHS = new Set(["/", "/login", "/signup"]);

// Проверка публичности URL.
function isPublicPath(pathName: string) {
  if (PUBLIC_PATHS.has(pathName)) return true;
  if (pathName.startsWith("/api/")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  // Получаю url.
  const { pathname } = request.nextUrl;

  // Если url публичный - продолжай.
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Запрашивает у пользователя сессионную куку.
  const sessionCookie =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token");

  // Если куки нет, перенаправляет на страницу входа.
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если кука есть, даёт доступ к не публичной странице.
  return NextResponse.next();
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<CONFIG FROM DOCS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
