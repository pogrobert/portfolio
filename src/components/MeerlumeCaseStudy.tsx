import { Section } from './CaseStudySections'
import { BowlerHat, Beret, CaptainHat, FireHelmet, HardHat, TopHat } from './Hats'
import { MeerlumeMark } from './Marks'
import { MeerlumeChat } from './MeerlumeChat'

// The page is about Robert's part in Meerlume; how the product works is the bot's to
// explain.
export function MeerlumeCaseStudy() {
  return (
    <>
      <h1 className="mt-8 flex items-center gap-3 text-4xl font-semibold tracking-tight">
        <MeerlumeMark className="size-10" />
        Meerlume
      </h1>
      <p className="mt-3 font-mono text-[13px] text-muted">Co-founder · Mar 2026 – present</p>
      <p className="mt-5 text-lg text-body">
        Meerlume lets a business build any chatbot it needs by describing it in plain words: one that answers
        questions, takes bookings or orders, or collects requests, on WhatsApp, Instagram, Messenger, Telegram
        and its own website. I co-founded it in March 2026,
        and we launched on 11 August. The bot below is a real one, made with Meerlume: ask it anything about it.
      </p>
      <p className="mt-4">
        <a href="https://meerlume.com">meerlume.com ↗</a>
      </p>
      <MeerlumeChat />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">The hats I wear</h2>
        <p className="mt-3 text-body">
          Co-founding a startup means doing a bit of everything, often all in the same week. These are the
          hats I wear.
        </p>

        <div className="mt-10 flex flex-col gap-16">
          <Section title="Product" heading="h3" art={CaptainHat} side="right">
            <p>
              I decide what we build and in what order, and plan the work week by week. Meerlume is for any bot a
              business needs, not just bookings, so I keep a close eye on tools like ManyChat and Typebot, and
              research the market to work out where Meerlume should go next. I set the pricing too.
            </p>
          </Section>

          <Section title="Engineering" heading="h3" art={HardHat} side="left">
            <p>
              I designed and built most of Meerlume: the builder, the shared inbox, bookings and calendars, and
              the connections to all five apps. I build with AI coding agents,
              mostly Claude Code. The agent writes the code, so most of my time goes into deciding how a feature
              should work and how it should feel.
            </p>
            <p>
              Every change goes to a separate reviewer agent that hasn’t seen the work. If it finds anything
              serious, the agent fixes it and a new reviewer starts over, until a round comes back clean. Then the
              agent tests the feature, and so do I.
            </p>
          </Section>

          <Section title="DevOps" heading="h3" art={FireHelmet} side="right">
            <p>
              The original plan was to run the backend on Google Cloud, but its developer experience is miserable:
              endless setup, and a maze of IAM permissions to get through before anything runs. So I chose Railway
              instead. For a while Railway wasn’t reliable, and after a security incident on their side, I
              moved our backend services to AWS in October. The website runs on Cloudflare, and the database on Neon.
            </p>
          </Section>

          <Section title="Design and brand" heading="h3" art={Beret} side="left">
            <p>
              We went through a lot of names. I wanted a meerkat in it, but nearly every meerkat name was
              already taken. Legally we could have used some of them, but we wanted a name that was
              clearly ours. Meerlume was still free, and it stuck with both of us. I drew the logo, two rounded chat bubbles like the two sides of a conversation, and later
              refined it with Claude Code driving Affinity, the design app.
            </p>
            <p>
              I design the product and the website: the landing page and its artwork, the builder and the
              dashboard.
            </p>
          </Section>

          <Section title="Marketing" heading="h3" art={TopHat} side="right">
            <p>
              I set up Meerlume’s accounts on Facebook, Instagram, TikTok and YouTube, and post reels there that I
              make with Claude Code and Remotion, which turns code into video. I made our launch video the same way,
              and I follow how the posts do in Metricool.
            </p>
            <p>
              I also wrote nearly everything there is to read about Meerlume: the blog, the feature pages, the
              step-by-step guides with their screenshots, and the changelog, every week, so customers can see
              what’s new.
            </p>
          </Section>

          <Section title="The business side" heading="h3" art={BowlerHat} side="left">
            <p>
              Some of the hardest work wasn’t code. I got Meerlume approved by Meta as an official WhatsApp
              partner, then through Meta’s review for Messenger and Instagram. We first applied to Lemon Squeezy,
              but it’s owned by Stripe and runs on Stripe’s systems, and getting a company from Armenia verified
              there was a wall we couldn’t get past. So I set up billing on Paddle, which also handles sales tax,
              and got us approved on Polar as a backup. And I set up our terms, the data agreement we sign with customers, and the email setup that
              keeps our emails out of spam.
            </p>
          </Section>
        </div>
      </section>

      <div className="mt-16">
        <Section title="The hardest call">
          <p>
            The whole market is moving to chatbots where AI writes every reply. I went the other way: a Meerlume
            bot only says what its owner approved, so it can’t get a price or a booking wrong. Going against where
            everyone else is heading is a hard call to make, and to keep making.
          </p>
          <p>
            I’m still weighing it. I may offer AI-written replies as an option one day, for owners who want them,
            next to the bots that stick to what they approved.
          </p>
        </Section>
      </div>
    </>
  )
}
