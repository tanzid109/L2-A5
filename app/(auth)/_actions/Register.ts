"use server"

import { redirect } from "next/navigation"
import { FieldValues } from "react-hook-form"

export const registerAction = async (userData: FieldValues) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  const result = await res.json()
  redirect("/login")

  return result
}
