import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const origin = request.nextUrl.origin;
    
    // Call the Better Auth session endpoint using native fetch to avoid dependencies in middleware
    const res = await fetch(`${origin}/api/auth/get-session`, {
        headers: { cookie: request.headers.get("cookie") || "" },
    });
    
    const session = await res.json().catch(() => null);

    if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    return NextResponse.next();
}

export const config = { 
  matcher: ["/admin/((?!login).*)"] 
};
