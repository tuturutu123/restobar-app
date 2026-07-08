// @ts-ignore
export { default } from "next-auth/middleware"

export const config = {
  // Solo protege la ruta admin y todo lo que esté dentro de ella
  matcher: ["/admin/:path*"],
}