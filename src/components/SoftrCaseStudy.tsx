import { AccountsLinework, BlocksLinework, CommentsLinework, FormLinework } from './Linework'
import { Note, Section } from './CaseStudySections'
import { SoftrMark } from './Marks'

const docs = 'https://docs.softr.io/building-blocks'

export function SoftrCaseStudy() {
  return (
    <>
      <h1 className="mt-8 flex items-center gap-3 text-4xl font-semibold tracking-tight">
        <SoftrMark className="size-10" />
        Softr
      </h1>
      <p className="mt-3 font-mono text-[13px] text-muted">Front-end engineer, blocks team · Dec 2022 – Jan 2026</p>
      <p className="mt-5 text-lg text-body">
        A Berlin-based no-code platform where every page is a stack of blocks, used by over a million people,
        including teams at Netflix, Google and Stripe. I joined about nine months into the v5 redesign, which
        rebuilt every block, so I worked on both sides of it: maintaining and extending the old blocks while
        building the new ones.
      </p>
      <p className="mt-4">
        <a href="https://www.softr.io">softr.io ↗</a>
      </p>

      <div className="mt-16 flex flex-col gap-16">
        <Section title="Conditional Form" art={FormLinework} side="right" link={{ label: 'Softr docs', href: `${docs}/conditional-forms` }}>
          I started on Softr’s existing forms, which were simple: maintenance, new features and bug fixes. That
          made me the owner of the block side of Conditional Form when its development began. We were kicking off
          Apricot, our new design system, at the same time, so I built its input components first, then the form
          itself: multi-step flows with sections, fields that appear and validate on conditions, and submissions
          to a configurable destination, all driven by a state machine. I also built condition evaluation and the
          record encoder, which converts form data into each destination’s format. Other blocks reused both later.
        </Section>

        <Section title="Comments" art={CommentsLinework} side="left" link={{ label: 'Softr docs', href: `${docs}/comments-block` }}>
          Comments comes in two forms: an action button in the Item Details block that opens a sliding drawer, and
          a separate block placed under Item Details. I designed and built its pieces in Apricot, such as avatars,
          the comment input and the emoji picker, and made the architectural change that lets Comments read the
          open item without breaking the isolation between blocks.
        </Section>

        <Section title="User Accounts" art={AccountsLinework} side="right" link={{ label: 'Softr docs', href: `${docs}/account-settings` }}>
          I maintained and extended the old account blocks, then built the new Forgot Password, Reset Password and
          User Profile blocks. A teammate built the new sign-in and sign-up, and I later maintained and extended
          those too. The new account blocks shipped to over a million users with zero critical incidents.
        </Section>

        <Section title="Everything else" art={BlocksLinework} side="left">
          I worked on almost every other block too: a lot on the old Calendar and Charts, and on the new List,
          Grid, Item Details, Calendar and Charts. I added polling to many of them, so they keep their data up to date
          instead of showing stale records. I led the block side of Onboarding and Standalone Form, and my last feature was
          Global Search.
        </Section>
      </div>

      <section className="mt-16 grid gap-8 sm:grid-cols-2">
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
