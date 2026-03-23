import { NextResponse, type NextRequest } from 'next/server'

export function updateSession(request: NextRequest) {
  const memberId = request.cookies.get('member_id')
  const { pathname } = request.nextUrl

  // Ignore API and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect to login (member selection) if no memberId is found
  if (!memberId && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If memberId is found and user is trying to go to login, send home
  if (memberId && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
