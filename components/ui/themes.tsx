"use client"
import * as React from "react"
import { ThemeProvider as NextthemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextthemesProvider>) {
  // Suppress the React 19 warning on the client side
  const scriptProps = typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

  return (
    <NextthemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextthemesProvider>
  )
}
