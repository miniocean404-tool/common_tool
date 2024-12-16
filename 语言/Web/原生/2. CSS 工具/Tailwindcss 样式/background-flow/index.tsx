"use client"

// 流体背景
import { useMounted } from "@/utils/hook/mounted"
import { useState } from "react"
import { useInterval } from "react-use"

export default function BackgroundFlow() {
  const mounted = useMounted()

  const [points, setPoints] = useState(() => new Array(16).fill(0).map(() => [Math.random(), Math.random()]))
  const [delay, setDelay] = useState(0)

  useInterval(jumpPoints, delay)

  function jumpPoints() {
    setPoints((pre) => pre.map(([x, y]) => [jumpVal(x), jumpVal(y)]))
    setDelay(2000 + Math.random() * 1000)
  }

  function jumpVal(val: number) {
    return Math.random() > 0.5 ? val + (Math.random() - 0.5) / 2 : Math.random()
  }

  const poly = () => points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", ")

  if (!mounted) return null

  return (
    <div className='absolute inset-0 -z-0 transform-gpu overflow-hidden blur-3xl' aria-hidden='true'>
      <div
        className='aspect-[1.7] h-full w-full bg-gradient-to-r from-rose-500 to-white/10 opacity-50 transition-[clip-path] duration-3 [clip-path:circle(75%);] lg:opacity-30'
        style={{ clipPath: `polygon(${poly()})` }}
      />
    </div>
  )
}
