export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    // 🔥 인증 제외할 경로 (로그 저장 / 유저 등록 API)
    '/((?!api/log|api/user-auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
