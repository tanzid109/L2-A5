"use server"

import {
  GetMyRentalRequestsResponse,
  CreatePaymentResponse,
  GetMyPaymentsResponse,
} from "@/lib/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getMyRentalRequests =
  async (): Promise<GetMyRentalRequestsResponse> => {
    try {
      const cookieStore = await cookies()
      const accessToken = cookieStore.get("accessToken")?.value

      if (!accessToken) {
        return {
          success: false,
          message: "You must be logged in to view your rental requests.",
        }
      }

      const url = `${process.env.BACKEND_API_URL}/api/rentals/my-requests`

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
        next: {
          tags: ["my-rental-requests"],
        },
      })

      const result = await res.json().catch(() => ({}))

      if (!res.ok) {
        return {
          success: false,
          statusCode: res.status,
          message:
            result?.message ??
            `Failed to fetch your rental requests (${res.status})`,
        }
      }

      return result
    } catch (error) {
      console.error("getMyRentalRequests error:", error)
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching your rental requests",
      }
    }
  }

export const makePayment = async (
  id: string
): Promise<CreatePaymentResponse> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return {
      success: false,
      message: "You must be logged in to make a payment.",
    }
  }

  let result: CreatePaymentResponse

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/create/${id}`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    )

    result = await res.json()
  } catch (error) {
    console.error("makePayment error:", error)

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while processing your payment.",
    }
  }

  if (result.success && result.data?.checkoutUrl) {
    redirect(result.data.checkoutUrl)
  }

  return result
}

export const getMyPayments = async (): Promise<GetMyPaymentsResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view your payments.",
      }
    }

    const url = `${process.env.BACKEND_API_URL}/api/payments`

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
      next: {
        tags: ["my-payments"],
      },
    })

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message:
          result?.message ?? `Failed to fetch your payments (${res.status})`,
      }
    }

    return result
  } catch (error) {
    console.error("getMyPayments error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching your payments",
    }
  }
}

export async function createReview(
  propertyId: string,
  payload: { rating: number; comment: string }
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${propertyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: result.message ?? "Failed to submit review.",
      }
    }

    revalidateTag("/my-requests", "max")
    return { success: true, message: result.message ?? "Review submitted." }
  } catch (error) {
    console.error("Failed to submit review:", error)
    return { success: false, message: "Something went wrong. Try again." }
  }
}

export async function getReviews(propertyId?: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: result.message ?? "Failed to fetch reviews.",
        data: [],
      }
    }

    return { success: true, data: result.data }
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return { success: false, message: "Something went wrong.", data: [] }
  }
}
