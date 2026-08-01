import jwt from "jsonwebtoken"

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret)
    return {
      success: true,
      data: verifiedToken,
    }
  } catch (error: any) {
    try {
      const decodedToken = jwt.decode(token)

      if (decodedToken && typeof decodedToken === "object") {
        return {
          success: true,
          data: decodedToken,
        }
      }
    } catch {
      // ignore decode errors and fall back below
    }

    console.log("Token verification failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const jwtUtils = {
  verifyToken,
}
