import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('zenqor_token')?.value;
    const { pathname } = request.nextUrl;


    if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return NextResponse.next();
    }

    return NextResponse.next();
}