"use server"

export interface Category {
  id: string
  name: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Landlord {
  id: string
  name: string
  email: string
}

export interface Property {
  id: string
  landlordId: string
  categoryId: string
  title: string
  description?: string
  address: string
  city: string
  price: string
  bedrooms: number
  bathrooms: number
  status: "AVAILABLE" | "RENTED" | "PENDING"
  createdAt: string
  updatedAt: string
  category: Category
  landlord: Landlord
}

interface GetAllPropertiesResponse {
  success: boolean
  statusCode?: number
  message?: string
  data?: Property[]
}

interface GetAllPropertiesParams {
  page?: number
  limit?: number
  category?: string
  search?: string
}

export const getAllProperties = async (
  params?: GetAllPropertiesParams
): Promise<GetAllPropertiesResponse> => {
  try {
    const query = new URLSearchParams()

    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.category) query.set("category", params.category)
    if (params?.search) query.set("search", params.search)

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
