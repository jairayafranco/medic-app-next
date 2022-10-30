import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
        if(request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/panel', request.url));
        }
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/panel/:path*', '/'],
}