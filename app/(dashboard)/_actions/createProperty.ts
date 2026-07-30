"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export interface CreatePropertyPayload {
  categoryId: string
  title: string
  description: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: "AVAILABLE" | "RENTED" | "PENDING"
}

interface CreatePropertyResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: {
    id: string
  }
}

export const createProperty = async (
  payload: CreatePropertyPayload
): Promise<CreatePropertyResponse> => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to add a property.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    )

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result?.message ?? `Failed to create property (${res.status})`,
      }
    }

    revalidateTag("my-properties","max")
    revalidateTag("properties","max")

    return result
  } catch (error) {
    console.error("createProperty error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the property",
    }
  }
}

interface UpdatePropertyResponse {
    success: boolean
    statusCode?: number
    message?: string
    data?: { id: string }
}

export const updateProperty = async (
    id: string,
    payload: CreatePropertyPayload
): Promise<UpdatePropertyResponse> => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value

        if (!accessToken) {
            return { success: false, message: "You must be logged in to update a property." }
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        })

        const result = await res.json().catch(() => ({}))

        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result?.message ?? `Failed to update property (${res.status})`,
            }
        }

        revalidateTag("my-properties","max")
        revalidateTag("properties","max")

        return result
    } catch (error) {
        console.error("updateProperty error:", error)
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong while updating the property.",
        }
    }
}


