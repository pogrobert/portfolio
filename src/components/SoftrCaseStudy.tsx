import type { Project } from '../content/projects'
import { CaseStudyHeader, Note, Section } from './CaseStudySections'
import { AccountsLinework, BlocksLinework, CommentsLinework, FormLinework } from './Linework'

const docs = 'https://docs.softr.io/building-blocks'

// The stack lifted past its room to fan out, so it lines up with the text like the others.
function StackLinework({ className }: { className?: string }) {
  return <BlocksLinework className={className} lifted />
}

export function SoftrCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <CaseStudyHeader project={project}>
        A Berlin-based no-code platform where every page is a stack of blocks, used by over a million people,
        including teams at Netflix, Google and Stripe. About nine months after I joined, Softr started the v5
        redesign, which rebuilt every block, so I worked on both sides of it: maintaining and extending the old
        blocks while building the new ones.
      </CaseStudyHeader>

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
          a separate block placed under Item Details. I took it from idea to production: I built the block, designed
          and built its pieces in Apricot, such as avatars, the comment input and the emoji picker, and made the
          architectural change that lets Comments read the open item without breaking the isolation between blocks.
        </Section>

        <Section title="User Accounts" art={AccountsLinework} side="right" link={{ label: 'Softr docs', href: `${docs}/account-settings` }}>
          I maintained and extended the old account blocks, then built the new Forgot Password, Reset Password and
          User Profile blocks. A teammate built the new sign-in and sign-up, and I later maintained and extended
          those too. The new account blocks shipped to over a million users with zero critical incidents.
        </Section>

        <Section title="Everything else" art={StackLinework} side="left">
          I worked on every other block too: a lot on Calendar, and on List, Item Details and Charts, both
          the old and the new versions of each, and the new Grid. I added polling to many of them, so they keep their data up to date
          instead of showing stale records. I led the block side of Onboarding and Standalone Form, and my last feature was
          Global Search.
        </Section>
      </div>

      {/* Its own heading, hidden, so the two notes don't read as part of the section above. */}
      <section aria-labelledby="softr-notes" className="mt-16 grid gap-8 sm:grid-cols-2">
        <h2 id="softr-notes" className="sr-only">
          Also at Softr
        </h2>
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
