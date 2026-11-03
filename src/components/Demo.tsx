import { motion } from 'motion/react'
import type { DemoKind } from '../content/projects'

type DemoProps = { kind: DemoKind; size?: 'tile' | 'hero' }

// Small, live-looking pieces of each project. They animate once when scrolled into
// view; MotionConfig in the root turns that off for people who prefer reduced motion.
// Nothing starts fully transparent, so a demo still shows if the animation never runs.
export function Demo({ kind, size = 'tile' }: DemoProps) {
  const height = size === 'hero' ? 'h-72 sm:h-96' : 'h-60'
  switch (kind) {
    case 'meerlume':
      return <MeerlumeFlow height={height} />
    case 'stamplyn':
      return <Stamps height={height} />
    case 'surfaces':
      return <SurfacesTiles height={height} />
    case 'softr':
      return <SoftrBlocks height={height} />
    case 'goya':
      return <GoyaPainting height={height} />
  }
}

const tile = 'overflow-hidden rounded-2xl border border-line'

const flowSteps = [
  { label: 'Trigger', text: 'New booking' },
  { label: 'Ask', text: 'Date and party size' },
  { label: 'Owner', text: 'Approve or decline' },
]

function MeerlumeFlow({ height }: { height: string }) {
  return (
    // Stacks vertically on phones, where three nodes don't fit side by side.
    <div
      className={`${tile} ${height} flex items-center justify-center bg-teal-tint p-6 max-sm:h-auto max-sm:py-8`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
        {flowSteps.map((step, i) => {
          const last = i === flowSteps.length - 1
          return (
            <div key={step.label} className="flex flex-col items-center sm:flex-row">
              <motion.div
                initial={{ opacity: 0.6, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.25 + i * 0.35, duration: 0.4, ease: 'easeOut' }}
                className={
                  last
                    ? 'rounded-xl bg-teal px-3.5 py-2.5 text-sm text-bg'
                    : 'rounded-xl border border-teal-line bg-card px-3.5 py-2.5 text-sm shadow-sm'
                }
              >
                <div className="font-mono text-[11px] opacity-75">{step.label}</div>
                <div>{step.text}</div>
              </motion.div>
              {!last && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.45 + i * 0.35, duration: 0.3 }}
                  className="h-5 w-px origin-top bg-teal-line sm:h-px sm:w-9 sm:origin-left"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Stamps({ height }: { height: string }) {
  return (
    <div className={`${tile} ${height} flex items-center justify-center gap-6 bg-orange-tint`} aria-hidden="true">
      <motion.div
        initial={{ scale: 1.2, rotate: -2 }}
        whileInView={{ scale: 1, rotate: -8 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.2 }}
        className="flex size-32 flex-col items-center justify-center rounded-full border-2 border-dashed border-orange text-orange"
      >
        <span className="font-mono text-[11px] tracking-widest">YEREVAN</span>
        <span className="text-xl font-semibold">Cascade</span>
        <span className="font-mono text-[11px]">03 · XI · 26</span>
      </motion.div>
      <motion.div
        initial={{ scale: 1.2, rotate: 12 }}
        whileInView={{ scale: 1, rotate: 6 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.55 }}
        className="flex size-28 flex-col items-center justify-center rounded-2xl border-2 border-blue text-blue"
      >
        <span className="font-mono text-[11px] tracking-widest">TBILISI</span>
        <span className="text-base font-semibold">Narikala</span>
      </motion.div>
    </div>
  )
}

// Placeholder swatches until the Surfaces package is published; then these become real covers.
const swatches = [
  'radial-gradient(circle at 70% 40%, #8b85ff 0, #635bff 18%, #e9e8ff 60%)',
  'radial-gradient(circle at 30% 55%, #2dd4bf 0, #0f766e 20%, #0b1716 62%)',
  'repeating-linear-gradient(90deg, #f97316 0 6px, #ffedd5 6px 12px)',
]

function SurfacesTiles({ height }: { height: string }) {
  return (
    <div className={`${tile} ${height} flex items-center justify-center gap-3.5 bg-violet-tint px-6`} aria-hidden="true">
      {swatches.map((background, i) => (
        <motion.div
          key={background}
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
          className="h-24 max-w-40 flex-1 rounded-xl"
          style={{ background }}
        />
      ))}
    </div>
  )
}

function SoftrBlocks({ height }: { height: string }) {
  const spring = { type: 'spring', stiffness: 260, damping: 24 } as const
  return (
    <div
      className={`${tile} ${height} grid grid-cols-2 grid-rows-[auto_1fr] gap-3 bg-tile p-7`}
      aria-hidden="true"
    >
      <motion.div
        initial={{ y: -16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ...spring, delay: 0.1 }}
        className="col-span-2 rounded-2xl bg-softr-yellow px-4.5 py-3.5 text-sm font-medium text-[#121212]"
      >
        Conditional Form
      </motion.div>
      <motion.div
        initial={{ x: -16 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ...spring, delay: 0.2 }}
        className="flex items-center justify-center rounded-full bg-softr-pink text-sm font-medium text-[#121212]"
      >
        Comments
      </motion.div>
      <motion.div
        initial={{ x: 16 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ...spring, delay: 0.3 }}
        className="flex items-center justify-center rounded-2xl bg-softr-blue text-sm font-medium text-white"
      >
        User Accounts
      </motion.div>
    </div>
  )
}

// Credit for the painting goes next to wherever this is shown.
function GoyaPainting({ height }: { height: string }) {
  return (
    <div className={`${tile} ${height} flex items-center justify-center bg-wall`}>
      <img
        src="/images/goya-the-forge.jpg"
        width={624}
        height={900}
        loading="lazy"
        alt="Francisco de Goya, The Forge: three men hammering glowing iron on an anvil"
        className="h-[82%] w-auto shadow-[0_6px_18px_rgba(0,0,0,0.25)] outline outline-4 outline-[#6b5a3e]"
      />
    </div>
  )
}
