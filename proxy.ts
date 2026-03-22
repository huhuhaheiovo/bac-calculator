import createMiddlewareModule from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const createMiddleware =
  typeof createMiddlewareModule === "function"
    ? createMiddlewareModule
    : (createMiddlewareModule as unknown as { default: typeof createMiddlewareModule }).default;

export const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
