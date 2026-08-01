import { JwtPayload } from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { jwtUtils } from "./utils/jwt"
import { getNewAccessToken } from "./service/refreshToken"

const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/properties"]

function redirectWithCookies(
  url: string,
  request: NextRequest,
  response: NextResponse
) {
  const redirect = NextResponse.redirect(new URL(url, request.url))
  response.cookies.getAll().forEach((c) => redirect.cookies.set(c))
  return redirect
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const response = NextResponse.next()

  let accessToken = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken()

    if (result.success) {
      const newAccessToken = result.data.accessToken

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      })

      accessToken = newAccessToken
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string
      )
    }
  }

  let userRole = null

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    const decodedPayload = decodedAccessToken.data as JwtPayload
    userRole = decodedPayload.role

    if (
      typeof decodedPayload.exp === "number" &&
      Date.now() >= decodedPayload.exp * 1000
    ) {
      response.cookies.delete("accessToken")
      accessToken = undefined
      userRole = null
    }
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return redirectWithCookies("/tenant-dashboard", request, response)
    } else if (userRole === "ADMIN") {
      return redirectWithCookies("/admin-dashboard", request, response)
    } else if (userRole === "LANDLORD") {
      return redirectWithCookies("/landlord-dashboard", request, response)
    } else {
      return redirectWithCookies("/", request, response)
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return redirectWithCookies(loginUrl.toString(), request, response)
  }

  if (pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
    return redirectWithCookies("/not-found", request, response)
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return redirectWithCookies("/not-found", request, response)
  } else if (
    pathname.startsWith("/landlord-dashboard") &&
    userRole !== "LANDLORD"
  ) {
    return redirectWithCookies("/not-found", request, response)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
}
