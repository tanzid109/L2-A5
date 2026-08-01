import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Toaster } from "sonner"
import { getMe } from "@/service/getMe"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Rent Nest",
  description: "Rent your desired apartment",
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const user = await getMe()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
    >
      <body>
        <ThemeProvider>
          <Navbar user={user} />
          {children}
        </ThemeProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout