import { NextResponse } from "next/server";

const RELOAD_TO_HOME_PATHS = new Set([
  "/about",
  "/experience",
  "/projects",
  "/portfolio",
  "/contact",
]);

export function handleReloadToHomeProxy(request) {
  const { pathname } = request.nextUrl;

  if (!RELOAD_TO_HOME_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const homeUrl = new URL("/", request.url);

  return NextResponse.redirect(homeUrl);
}
