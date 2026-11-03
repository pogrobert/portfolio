import { motion, type Variants } from 'motion/react'

// Softr's mark: a wide bar over a circle and a rounded square, the same three shapes
// Logo draws at text size. Here the pieces arrive like blocks dropped onto a page and
// spread apart a little on hover. They start only a few units off, so the mark still
// reads if the animation never runs.
const spring = { type: 'spring', stiffness: 320, damping: 22 } as const

const bar: Variants = {
  apart: { y: -5 },
  rest: { y: 0, transition: { ...spring, delay: 0.1 } },
  spread: { y: -1.5, transition: spring },
}
const circle: Variants = {
  apart: { x: -5, y: 2 },
  rest: { x: 0, y: 0, transition: { ...spring, delay: 0.25 } },
  spread: { x: -1.5, y: 1, transition: spring },
}
const square: Variants = {
  apart: { x: 5, y: 2 },
  rest: { x: 0, y: 0, transition: { ...spring, delay: 0.4 } },
  spread: { x: 1.5, y: 1, transition: spring },
}

export function SoftrMark({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="-4.5 -3.5 40 40"
      aria-hidden="true"
      className={className}
      initial="apart"
      whileInView="rest"
      whileHover="spread"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.rect variants={bar} x="1" y="2" width="29" height="13" rx="4.5" fill="#fcb500" />
      <motion.circle variants={circle} cx="7.5" cy="24.5" r="6.5" fill="#f53878" />
      <motion.rect variants={square} x="17" y="18" width="13" height="13" rx="4" fill="#386af5" />
    </motion.svg>
  )
}
