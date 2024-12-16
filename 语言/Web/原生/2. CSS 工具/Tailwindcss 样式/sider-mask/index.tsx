"use client"

import type { PropsWithChildren } from "react"
import { cn } from "~/lib/utils"

interface SiderMaskProps {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}

// 侧边栏遮罩
// mask 左右："[mask-image:linear-gradient(90deg,transparent_0%,#ffffff_30%,#ffffff_70%,transparent_100%)]"
// mask 上下："[mask-image:linear-gradient(0deg,transparent_0%,#ffffff_30%,#ffffff_70%,transparent_100%)]"
export default function SiderMask(props: Readonly<PropsWithChildren<SiderMaskProps>>) {
  const { top, bottom, left, right, children } = props

  return (
    <div className={cn({ relative: children })}>
      {children}

      {left && (
        <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-white dark:from-background' />
      )}
      {right && (
        <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-gradient-to-l from-white dark:from-background' />
      )}

      {top && (
        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-white dark:from-background' />
      )}
      {bottom && (
        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-white dark:from-background' />
      )}
    </div>
  )
}
