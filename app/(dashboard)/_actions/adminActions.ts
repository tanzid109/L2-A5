"use server"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view users.",
      }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 5,
        tags: ["admin-users"],
      },
    })

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: `Failed to fetch users (${res.status})`,
      }
    }

    return await res.json()
  } catch (error) {
    console.error("getAllUsers error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching users",
    }
  }
}

export const getAllProperties = async () => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view properties.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/properties`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 5,
          tags: ["admin-properties"],
        },
      }
    )

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

export const getAllRentals = async () => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to view rentals.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 5,
          tags: ["admin-rentals"],
        },
      }
    )

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: `Failed to fetch rentals (${res.status})`,
      }
    }

    return await res.json()
  } catch (error) {
    console.error("getAllRentals error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching rentals",
    }
  }
}

export type UserStatus = "ACTIVE" | "BANNED"

export const updateUserStatus = async (id: string, status: UserStatus) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to update a user's status.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
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
          result?.message ?? `Failed to update user status (${res.status})`,
      }
    }

    revalidateTag("admin-users", "max")

    return result
  } catch (error) {
    console.error("updateUserStatus error:", error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the user's status",
    }
  }
}
