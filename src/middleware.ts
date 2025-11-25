export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api/log|api/user-auth|api/auth|_next|favicon.ico).*)",
  ],
};
