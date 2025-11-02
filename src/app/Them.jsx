'use client'

import { ThemeProvider } from "next-themes"

 

export function ProviderTheme({ children }) {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}