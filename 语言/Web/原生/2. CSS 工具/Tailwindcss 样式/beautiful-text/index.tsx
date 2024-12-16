import type { PropsWithChildren } from "react"
import { cn } from "~/lib/utils"
import "./index.css"

interface BeautifulTextProps {
  className?: string
  text: string
}

// 流体的文字
export default function BeautifulText(props: PropsWithChildren<BeautifulTextProps>) {
  return (
    <span className={cn("relative inline-flex", "overflow-hidden", props.className)}>
      {props.text}

      <div className={cn("aurora pointer-events-none absolute inset-0", "mix-blend-lighten dark:mix-blend-darken")}>
        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-1))",
            animation: "mini-aurora-border 6s ease-in-out infinite, mini-aurora-1 12s ease-in-out infinite alternate",
          }}
          className={cn("absolute h-[60vw] w-[60vw] blur-lg", "mix-blend-overlay")}
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-2))",
            animation: "mini-aurora-border 6s ease-in-out infinite, mini-aurora-2 12s ease-in-out infinite alternate",
          }}
          className={cn("absolute h-[60vw] w-[60vw] blur-lg", "mix-blend-overlay")}
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-3))",
            animation: "mini-aurora-border 6s ease-in-out infinite, mini-aurora-3 12s ease-in-out infinite alternate",
          }}
          className={cn("absolute h-[60vw] w-[60vw] blur-lg", "mix-blend-overlay")}
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-4))",
            animation: "mini-aurora-border 6s ease-in-out infinite, mini-aurora-4 12s ease-in-out infinite alternate",
          }}
          className={cn("absolute h-[60vw] w-[60vw] blur-lg", "mix-blend-overlay")}
        ></div>

        <div
          style={{
            backgroundColor: "hsl(var(--mini-aurora-color-5))",
            animation: "mini-aurora-border 6s ease-in-out infinite",
          }}
          className={cn("absolute h-[60vw] w-[60vw] blur-lg", "mix-blend-overlay")}
        ></div>
      </div>
    </span>
  )
}
