export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/dashboard', '/topics/:path*', '/addTopic', '/editTopic/:path*'],
}
