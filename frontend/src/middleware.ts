import {NextRequest, NextResponse} from 'next/server'

export async function middleware(req: NextRequest) {

const token = req.cookies.get('token')

  if (req.nextUrl.pathname === '/' && !token ) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
