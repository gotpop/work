import "@/lib/storyblok-init"
import "@gotpop/system/styles"
import { getConfig } from "@gotpop/storyblok"
import { inter, monaspace } from "@gotpop/system/fonts"

import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig()
  const { description, app_name: title } = config || {}

  return {
    title,
    description,
    icons: {
      icon: "/logo.svg",
    },
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    other: {
      "theme-color": "#1a4a5c",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-capable": "yes",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${monaspace.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
