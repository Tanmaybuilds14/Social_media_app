"use client"
import * as React from "react"
import { ThemeProvider as NextthemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextthemesProvider>) {
  return <NextthemesProvider {...props} > {children} </NextthemesProvider>
}
