"use server"

import {
  DeletePropertyResponse,
  GetCategoryResponse,
  GetLandlordRentalRequestsResponse,
  GetMyPropertiesResponse,
  RentalStatusAction,
} from "@/lib/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const getMyProperties = async (): Promise<GetMyPropertiesResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view your properties.",
      }
    }

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties/my-properties`

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 5,
        tags: ["my-properties"],
      },
    })

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: `Failed to fetch your properties (${res.status})`,
      }
    }

    return await res.json()
  } catch (error) {
    console.error("getMyProperties error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching your properties",
    }
  }
}

export const deleteProperty = async (
  id: string
): Promise<DeletePropertyResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to delete a property.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    )

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message ?? `Failed to delete property (${res.status})`,
      }
    }

    revalidateTag("my-properties", "max")
    revalidateTag("properties", "max")

    return { success: true, message: result?.message ?? "Property deleted." }
  } catch (error) {
    console.error("deleteProperty error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the property.",
    }
  }
}

export const getLandlordRentalRequests =
  async (): Promise<GetLandlordRentalRequestsResponse> => {
    try {
      const cookieStore = await cookies()
      const accessToken = cookieStore.get("accessToken")?.value

      if (!accessToken) {
        return {
          success: false,
          message: "You must be logged in to view rental requests.",
        }
      }

      const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals/landlord`,
        {
          method: "GET",
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
          cache: "no-store",
          next: {
            tags: ["landlord-rentals"],
          },
        }
      )

      const result = await res.json().catch(() => ({}))

      if (!res.ok) {
        return {
          success: false,
          statusCode: res.status,
          message:
            result?.message ??
            `Failed to fetch rental requests (${res.status})`,
        }
      }

      return result
    } catch (error) {
      console.error("getLandlordRentalRequests error:", error)
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching rental requests",
      }
    }
  }

export const rentalStatusChange = async (
  id: string,
  status: RentalStatusAction
) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to update rental requests.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/landlord/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    )

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message:
          result?.message ?? `Failed to update rental request (${res.status})`,
      }
    }

    revalidateTag("landlord-rentals", "max")

    return {
      success: true,
      message: result?.message ?? `Rental request ${status.toLowerCase()}.`,
    }
  } catch (error) {
    console.error("rentalStatusChange error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the rental request.",
    }
  }
}


export const getCategory = async (): Promise<GetCategoryResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view categories.",
      }
    }

    const url = `${process.env.BACKEND_API_URL}/api/category`

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60,
        tags: ["categories"],
      },
    })

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: `Failed to fetch categories (${res.status})`,
      }
    }

    return await res.json()
  } catch (error) {
    console.error("getCategory error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching categories",
    }
  }
}
