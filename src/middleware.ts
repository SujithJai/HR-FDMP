import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Pages that don't require authentication
const PUBLIC_PAGES = ["/login", "/forgot-password", "/reset-password", "/"];
// API routes that are public
const PUBLIC_API_ROUTES = ["/api/health", "/api/seed"];

// Check if Supabase is actually configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url !== "https://YOUR_PROJECT_ID.supabase.co" && key !== "YOUR_SUPABASE_ANON_KEY");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPage = PUBLIC_PAGES.includes(pathname);
  const isPublicApi = PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));

  // If Supabase is not configured, skip auth entirely (dev/local mode)
  if (!isSupabaseConfigured()) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const cookie of cookiesToSet) {
            supabaseResponse.cookies.set(cookie.name, cookie.value, cookie.options);
          }
        },
      },
    }
  );

  try {
    const hasDemoCookie = request.cookies.get("demo_auth")?.value === "true";
    const { data: { session } } = await supabase.auth.getSession();

    const isAuthenticated = !!session || hasDemoCookie;

    // If it's a protected route and no session/demo cookie, redirect to login
    if (!isPublicPage && !isPublicApi && !isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user is logged in and trying to access login page, redirect to dashboard
    if (isPublicPage && isAuthenticated && pathname !== "/") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Add user info to headers for API routes
    if (session && pathname.startsWith("/api/")) {
      supabaseResponse.headers.set("x-user-id", session.user.id);
      supabaseResponse.headers.set("x-user-email", session.user.email || "");
    }
  } catch {
    // If Supabase auth fails, let the request through (fallback)
  }

  return supabaseResponse;
}

// Matcher - run middleware on all routes except static files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|node_modules/|.*\\.).*)",
  ],
};
