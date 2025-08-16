"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"
import { CheckCircle, XCircle } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster capitalize group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group mr-0.5 toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "mr-0.5 group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-green-500  !text-white !border-green-500 [&>*]:!text-white [&_*]:!text-white",
          error: "!bg-red-500 !text-white !border-red-500 [&>*]:!text-white [&_*]:!text-white",
        },
      }}
      icons={{
        success: <CheckCircle className="h-6 w-6 text-white" />,
        error: <XCircle className="h-6 w-6 text-white" />,
      }}
      {...props}
    />
  )
}

export { Toaster }