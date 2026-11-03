import { motion } from 'motion/react'

// The three shapes of Softr's logo, each holding one of the blocks I built.
// They start slightly apart and settle into the logo's arrangement.
const settle = { type: 'spring', stiffness: 220, damping: 26 } as const
const inView = { once: true, amount: 0.3 } as const

export function SoftrCaseStudy() {
  return (
    <>
      <p className="mt-8 font-mono text-[13px] text-muted">Front-end engineer, blocks team · Dec 2022 – Jan 2026</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Softr</h1>
      <p className="mt-5 text-lg text-body">
        A no-code platform with over a million users, where every page is a stack of blocks. I built some of
        its most complex ones.
      </p>

      <section aria-label="The blocks I built" className="mt-10 flex flex-wrap gap-4 text-[#121212]">
        <motion.div
          initial={{ y: -28 }}
          whileInView={{ y: 0 }}
          viewport={inView}
          transition={settle}
          className="flex basis-full flex-col gap-6 rounded-[32px] bg-softr-yellow p-7 sm:p-9"
        >
          <div>
            <p className="font-mono text-[13px]">Block · greenfield</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">Conditional Form</h2>
            <p className="mt-3">
              Multi-step forms with sections, fields that appear and validate on conditions, and configurable
              submission destinations. I designed the condition engine behind it, and other platform features
              later reused it.
            </p>
          </div>
          <FormSketch />
        </motion.div>

        <motion.div
          initial={{ x: -28 }}
          whileInView={{ x: 0 }}
          viewport={inView}
          transition={{ ...settle, delay: 0.1 }}
          className="flex aspect-square min-w-0 flex-[1_1_280px] flex-col items-center justify-center gap-2 rounded-full bg-softr-pink p-[13%] text-center"
        >
          <p className="font-mono text-[13px]">Block</p>
          <h2 className="text-2xl font-semibold tracking-tight">Comments</h2>
          <p className="text-sm">Concept to production</p>
        </motion.div>

        <motion.div
          initial={{ x: 28 }}
          whileInView={{ x: 0 }}
          viewport={inView}
          transition={{ ...settle, delay: 0.2 }}
          className="flex aspect-square min-w-0 flex-[1_1_280px] flex-col justify-end gap-2 rounded-[40px] bg-softr-blue p-7 text-white sm:p-9"
        >
          <p className="font-mono text-[13px]">System</p>
          <h2 className="text-2xl font-semibold tracking-tight">User Accounts</h2>
          <dl className="mt-3 flex gap-6">
            <div>
              <dt className="sr-only">Users</dt>
              <dd className="text-3xl leading-none font-semibold">1M+</dd>
              <dd className="text-[13px]">users</dd>
            </div>
            <div>
              <dt className="sr-only">Critical incidents</dt>
              <dd className="text-3xl leading-none font-semibold">0</dd>
              <dd className="text-[13px]">critical incidents</dd>
            </div>
          </dl>
        </motion.div>
      </section>
      <p className="mt-4 text-sm text-muted">The three shapes come from Softr’s logo. Each one holds a block I built.</p>

      {/* The circle and square only fit a title, so the detail sits underneath, one column each. */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-4">
        <div>
          <h3 className="font-semibold">Comments</h3>
          <p className="mt-2 text-body">
            Blocks are strictly isolated, but Comments needed the item open in the Item Details block. I lifted
            that state into the Renderer, which already owns block order and visibility, so neither block had to
            know about the other.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">User Accounts</h3>
          <p className="mt-2 text-body">
            Sign-in, password reset and account settings, rebuilt from scratch to replace a buggy legacy version.
            It shipped to over a million users with zero critical incidents.
          </p>
        </div>
      </div>

      <section className="mt-16 grid gap-8 sm:grid-cols-3">
        <Note title="Design system foundations">
          The input and display field components the other blocks are built from.
        </Note>
        <Note title="Dates and time zones">
          Standardized date handling across the app and ended a long-running class of formatting bugs.
        </Note>
        <Note title="Craft with design">
          Animations, interactions, edge cases and WCAG accessibility, worked out with designers.
        </Note>
      </section>
    </>
  )
}

function Note({ title, children }: { title: string; children: string }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] text-body">{children}</p>
    </div>
  )
}

// A static sketch of the block: step 2 of 3, with "Team size" shown because of the plan chosen.
function FormSketch() {
  return (
    <div className="flex max-w-sm flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm" aria-hidden="true">
      <div className="flex gap-1.5">
        <span className="h-1 flex-1 rounded-full bg-[#121212]" />
        <span className="h-1 flex-1 rounded-full bg-[#121212]" />
        <span className="h-1 flex-1 rounded-full bg-[#e5e5e0]" />
      </div>
      <span className="text-[13px] font-medium">Plan</span>
      <span className="rounded-xl border border-[#ddddd8] px-3 py-2.5 text-sm">Business</span>
      <span className="self-start rounded-md bg-[#fff4d6] px-2 py-1 font-mono text-xs">
        show “Team size” if Plan = Business
      </span>
      <span className="text-[13px] font-medium">Team size</span>
      <span className="rounded-xl border border-[#ddddd8] px-3 py-2.5 text-sm">12</span>
    </div>
  )
}
