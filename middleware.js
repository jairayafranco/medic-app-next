import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = request.cookies.get('token');
    const url = request.nextUrl.pathname;

    if (!token && url !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const result = await validateToken(token);

    if (result && url === '/') {
        return NextResponse.redirect(new URL('/panel', request.url));
    }

    if (!result && url.startsWith('/panel')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (result && url === '/login') {
        return NextResponse.redirect(new URL('/panel', request.url));
    }

    // return NextResponse.next();

    async function validateToken(token) {
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
            return true;
        } catch (err) {
            return false;
        }
    }
}

export const config = {
    matcher: ['/panel/:path*', '/', '/login'],
}