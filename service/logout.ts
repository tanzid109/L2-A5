"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const logout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  revalidateTag("my-profile","max")
  redirect("/")
}
