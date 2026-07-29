"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

interface CreateRentalRequestResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: {
    id: string
    propertyId: string
    tenantId: string
    status: string
    createdAt: string
  }
}

export const createRentalRequest = async (
  propertyId: string
): Promise<CreateRentalRequestResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to request a rental.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/${propertyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    )

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message ?? `Request failed (${res.status})`,
      }
    }

    revalidateTag("properties","max")
    revalidateTag("my-rentals","max")

    return result
  } catch (error) {
    console.error("createRentalRequest error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the rental request.",
    }
  }
}
