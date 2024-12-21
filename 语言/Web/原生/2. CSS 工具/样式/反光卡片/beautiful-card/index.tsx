"use client"

// 源效果地址：https://key-drop.com/en/#limited-edition
// 文章地址：https://juejin.cn/post/7326461075447201843

import React, { useState } from "react"
import Image, { type StaticImageData } from "next/image"

import overlayer from "./image/overlayer.png"

import background from "./image/bg.png"
import background2 from "./image/bg2.png"

import people1 from "./image/people/people1.avif"
import people2 from "./image/people/people2.avif"
import people3 from "./image/people/people3.avif"
import people4 from "./image/people/people4.avif"
import people5 from "./image/people/people5.avif"
import people6 from "./image/people/people6.avif"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import "./index.css"

const cards = [
  {
    people: people1,
    foregroundColor: "rgb(255, 200, 255)",
    backgroundColor: "rgb(50, 161, 161)",
    background,
  },
  {
    people: people2,
    foregroundColor: "rgb(255, 200, 0)",
    backgroundColor: "rgb(161, 161, 161)",
    background: background2,
  },
  {
    people: people3,
    foregroundColor: "rgb(255, 200, 255)",
    backgroundColor: "rgb(50, 161, 161)",
    background,
  },
  {
    people: people4,
    foregroundColor: "rgb(255, 200, 255)",
    backgroundColor: "rgb(161, 161, 161)",
    background: background2,
  },
  {
    people: people5,
    foregroundColor: "rgb(255, 200, 255)",
    backgroundColor: "rgb(50, 161, 161)",
    background,
  },
  {
    people: people6,
    foregroundColor: "rgb(255, 200, 255)",
    backgroundColor: "rgb(50, 161, 161)",
    background,
  },
]

export function RenderCard() {
  return (
    <div className='layout'>
      {cards.map((card, index) => {
        return (
          <BeatifulCard
            people={card.people}
            foregroundColor={card.foregroundColor}
            backgroundColor={card.backgroundColor}
            background={card.background}
          />
        )
      })}
    </div>
  )
}

interface BeatifulCardProps {
  people: StaticImageData
  foregroundColor: string
  backgroundColor: string
  background: StaticImageData
}

export default function BeatifulCard(props: BeatifulCardProps) {
  let cardX = useMotionValue(0)
  let cardY = useMotionValue(0)

  const xPercentageMotion = useMotionValue(50)
  const yPercentageMotion = useMotionValue(50)

  const [isHover, setisHover] = useState(false)
  const [isTap, setIsTap] = useState(false)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let { left, top, width, height } = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - left
    const y = e.clientY - top

    const axisX = y - height / 2 - 1
    const axisY = -(x - width / 2 - 1)

    cardX.set(axisX)
    cardY.set(axisY)

    const xPercentage = (x / width) * 100
    const yPercentage = (y / height) * 100

    xPercentageMotion.set(xPercentage)
    yPercentageMotion.set(yPercentage)
  }
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    cardX.set(0)
    cardY.set(0)
    xPercentageMotion.set(50)
    yPercentageMotion.set(50)
  }

  const onHoverStart = () => setisHover(true)
  const onHoverEnd = () => setisHover(false)

  const onMouseDown = () => setIsTap(true)
  const onMouseUp = () => setIsTap(false)

  const cardXTransform = useTransform(cardX, [-169, 169], [-10, 10])
  const cardYTransform = useTransform(cardY, [-124, 124], [-10, 10])

  const cardXSpring = useSpring(cardXTransform, { damping: 20 })
  const cardYSpring = useSpring(cardYTransform, { damping: 20 })

  const peopleXTransform = useTransform(cardX, [-169, 169], [-15, 15])
  const peopleYTransform = useTransform(cardY, [-124, 124], [-15, 15])

  const peopleXSpring = useSpring(peopleXTransform, { damping: 20 })
  const peopleYSpring = useSpring(peopleYTransform, { damping: 20 })

  // 光效缓慢变化
  const xPercentageSpring = useSpring(xPercentageMotion, { damping: 20 })
  const yPercentageSpring = useSpring(yPercentageMotion, { damping: 20 })

  const percentageTransform_1_3 = useTransform([xPercentageSpring, yPercentageSpring], ([x, y]) => {
    return `radial-gradient(farthest-corner circle at ${x}% ${y}%, var(--backgroundColor) 5%, transparent 60%)`
  })
  const percentageTransform_2_4 = useTransform([xPercentageSpring, yPercentageSpring], ([x, y]) => {
    return `radial-gradient(farthest-corner circle at ${x}% ${y}%, var(--foregroundColor) 5%, transparent 60%)`
  })

  return (
    <div
      className='container'
      style={{
        "--foregroundColor": props.foregroundColor,
        "--backgroundColor": props.backgroundColor,
      }}
    >
      <motion.div
        className='card'
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.05 }}
        transition={{ type: "spring", bounce: 0.5 }}
        style={{
          clipPath: "inset(0px round 6px)",
          rotateX: cardXSpring,
          rotateY: cardYSpring,
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Image className='bg' src={props.background} width={237} height={330} alt='' />
        <Image className='overlayer' src={overlayer} width={237} height={330} alt='' />

        <motion.div
          className='light1'
          animate={{ opacity: isHover ? 1 : 0 }}
          transition={{ damping: 20 }}
          style={{ backgroundImage: percentageTransform_1_3 }}
        ></motion.div>

        <motion.div
          className='light2'
          animate={{ opacity: isHover ? 0.1 : 0 }}
          transition={{ damping: 20 }}
          style={{ backgroundImage: percentageTransform_2_4 }}
        ></motion.div>

        <motion.div
          className='light3'
          animate={{ opacity: isHover ? 0.5 : 0 }}
          transition={{ damping: 20 }}
          style={{ backgroundImage: percentageTransform_1_3 }}
        ></motion.div>

        <motion.div
          className='people'
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.57 }}
          style={{ scale: 1.05, y: 13.5, rotateX: peopleXSpring, rotateY: peopleYSpring }}
        >
          <Image src={props.people} width={301} height={301} alt='' />
        </motion.div>

        <motion.div className='overlayer2' style={{ opacity: isTap ? 1 : 0.5 }}>
          <Image src={overlayer} width={237} height={330} alt='' />
        </motion.div>

        <motion.div
          className='light4'
          animate={{ opacity: isHover ? 0.6 : 0 }}
          transition={{ damping: 20 }}
          style={{ backgroundImage: percentageTransform_2_4 }}
        ></motion.div>
      </motion.div>
    </div>
  )
}
