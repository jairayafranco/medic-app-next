import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = request.cookies.get('token');
    const url = request.nextUrl.pathname;
    const redirect = (url) => NextResponse.redirect(new URL(url, request.url));

    const result = await validateToken(token);

    if (result && url === '/') {
        return redirect('/panel');
    }

    if (!result && url === '/') {
        return redirect('/login');
    }

    if (!result && url.startsWith('/panel')) {
        return redirect('/login');
    }

    if (result && url === '/login') {
        return redirect('/panel');
    }

    if (!result && url.startsWith('/api')) {
        return redirect('/api/auth/unauthorized');
    }

    async function validateToken(token) {
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
            return true;
        } catch {
            return false;
        }
    }
}

export const config = {
    matcher: ['/panel/:path*', '/', '/login', '/api/data/:path*'],
}