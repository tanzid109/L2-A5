"use server"

import { GetAllPropertiesParams, GetAllPropertiesResponse } from "@/lib/types"

export const getAllProperties = async (
  params?: GetAllPropertiesParams
): Promise<GetAllPropertiesResponse> => {
  try {
    const query = new URLSearchParams()

    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.category) query.set("category", params.category)
    if (params?.search) query.set("search", params.search)
    if (params?.city) query.set("city", params.city)
    if (params?.status) query.set("status", params.status)
    if (params?.minPrice) query.set("minPrice", String(params.minPrice))
    if (params?.maxPrice) query.set("maxPrice", String(params.maxPrice))

    const queryString = query.toString()
    const url = `${process.env.BACKEND_API_URL}/api/property${queryString ? `?${queryString}` : ""}`

    const res = await fetch(url, {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 60 * 5,
        tags: ["properties"],
      },
    })

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: `Failed to fetch properties (${res.status})`,
      }
    }

    return await res.json()
  } catch (error) {
    console.error("getAllProperties error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching properties",
    }
  }
}
