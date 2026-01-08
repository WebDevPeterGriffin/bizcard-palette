import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Check if it's a custom domain
  // We treat anything that's NOT localhost and NOT vercel.app as a custom domain
  // You might want to add your production domain here if it's different
  const isCustomDomain = !hostname.includes('localhost') && 
                        !hostname.includes('.vercel.app') && 
                        !hostname.includes('mildtechstudios.com'); // Add your main domain here

  if (isCustomDomain) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          },
        },
      }
    )

    // Lookup the slug and publication status for this custom domain
    const { data, error } = await supabase
      .from('website_configs')
      .select('slug, is_published')
      .eq('custom_domain', hostname)
      .single()

    // Log for debugging (can be removed later)
    console.log('[Middleware] Custom domain lookup:', { hostname, data, error: error?.message })

    if (data) {
      if (!data.is_published) {
        // Rewrite to under construction page
        console.log('[Middleware] Site unpublished, showing under construction')
        return NextResponse.rewrite(new URL('/under-construction', request.url))
      }

      if (data.slug) {
        // Rewrite to the slug page
        const url = request.nextUrl.clone()
        url.pathname = `/${data.slug}${url.pathname === '/' ? '' : url.pathname}`
        console.log('[Middleware] Rewriting to:', url.pathname)
        return NextResponse.rewrite(url)
      }
    }

    // If we got here with a custom domain but no data, show under construction
    // This handles the case where the domain exists but isn't in our DB
    console.log('[Middleware] No data found for custom domain, showing under construction')
    return NextResponse.rewrite(new URL('/under-construction', request.url))
  }

  // Define protected routes
  const protectedPaths = ['/dashboard', '/websites']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Define auth routes
  const authPaths = ['/auth/login', '/auth/signup']
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Only run auth check for protected or auth paths
  if (isProtectedPath || isAuthPath) {
    const { supabaseResponse, user } = await updateSession(request)

    // Redirect to login if accessing protected route without auth
    if (isProtectedPath && !user) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to dashboard if already logged in and accessing auth pages
    if (isAuthPath && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
