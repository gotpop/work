import "@/lib/storyblok-init"
import "@gotpop/system/styles"
import { getConfig } from "@gotpop/storyblok"
import { inter, monaspace } from "@gotpop/system/fonts"
import "./theme.css"

import type { Metadata, Viewport } from "next"

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig()
  const { description, app_name: title } = config || {}

  return {
    title,
    description,
    icons: {
      icon: "/logo.svg",
    },
    other: {
      "theme-color": "#1a4a5c",
      "apple-mobile-web-app-status-bar-style": "default",
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
      <head>
        <meta
          name="theme-color"
          content="#1a4a5c"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a4a5c"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${inter.variable} ${monaspace.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
