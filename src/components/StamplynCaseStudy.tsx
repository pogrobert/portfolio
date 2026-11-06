import { Section } from './CaseStudySections'
import { Demo } from './Demo'
import { StamplynMark } from './Marks'

export function StamplynCaseStudy() {
  return (
    <>
      <h1 className="mt-8 flex items-center gap-3 text-4xl font-semibold tracking-tight">
        <StamplynMark className="size-10" />
        Stamplyn
      </h1>
      <p className="mt-3 font-mono text-[13px] text-muted">Co-founder · Sep 2026 – present</p>
      <p className="mt-5 text-lg text-body">
        Stamplyn is a travel app where you collect a stamp from every landmark you visit, by being there. Your
        passport fills up as you travel, and you can follow your friends’ stamps and see where you rank in your
        city, your country and the world. We’re a team of four co-founders, and I lead product, design and
        engineering. It’s in testing on TestFlight, ahead of launch.
      </p>
      <p className="mt-4">
        <a href="https://stamplyn.com">stamplyn.com ↗</a>
      </p>
      <figure className="mt-8">
        <Demo kind="stamplyn" size="hero" />
      </figure>

      <div className="mt-16 flex flex-col gap-16">
        <Section title="From booking app to stamps">
          <p>
            Stamplyn started as one of my co-founders’ ideas: an app to book a whole trip in one place, from the
            flights and the hotel to museum tickets and getting around. That’s how we started building it, with
            stamps as one feature among many.
          </p>
          <p>
            The more research I did, the less I believed in it. Plenty of apps had tried to be the one place for
            all your bookings, and many of them failed. And I doubted people would trust a new app with all of
            theirs. The stamps were the part no one else had, so I proposed dropping everything else and building
            only them, and the team backed it. Rick Rubin is sometimes called a reducer rather than a producer;
            that’s who I think a new product needs most.
          </p>
        </Section>

        <Section title="Leading a team that builds with agents">
          <p>
            Three of us write the code, all with AI coding agents, and I plan the work. I break each feature into issues,
            each with a brief an agent can work from: what to build, how it should behave, and when it’s done. I
            size each piece for whoever picks it up, then review and merge the pull requests. I take on some of
            the hardest parts myself, but not all of them: hard problems are how a team gets better, so I hand
            them out too.
          </p>
        </Section>

        <Section title="Mapping the world’s landmarks">
          <p>
            A stamp app is only as good as its map, and I didn’t want anyone writing cities by hand. So I built a
            pipeline that maps a whole country in one command. It starts from Wikidata, the open database behind
            Wikipedia: every museum, monastery, waterfall, old town and famous street with coordinates, minus the
            airports, train stations and anything demolished. OpenStreetMap adds each place’s outline, and Wikivoyage’s
            “See” lists let in small places Wikipedia barely covers.
          </p>
          <p>
            Gemma 4, Google’s open model, keeps or drops each place, picks its icon and chooses its name, but only from the names
            Wikidata already has, and code checks every one. Code, not the model, decides the rest: how famous a
            place is, from how many Wikipedia languages cover it and how often it’s read; which of the four stamp
            materials it gets, from paper to holographic; which album it belongs to; and how close you have to be
            to collect it. A lake counts from anywhere along its shore, and a mountain from the viewpoints that
            look at it.
          </p>
          <p>
            Claude agents reviewed the result country by country and cross-checked each other’s calls. Memorials stay in,
            but quietly, with no points and no confetti, while politically hostile sites and areas under travel
            warnings are left out. That’s how Stamplyn covers most of the world: over 40,000 landmarks in over
            2,000 albums, for a few cents of model time per country.
          </p>
          <p>
            Every landmark also has a line or two about it, written by Claude Haiku and checked against the
            place’s Wikipedia article by Claude Sonnet. Audits of random samples found a detail off in about one line
            in 20 at worst, and none about the wrong place.
          </p>
        </Section>

        <Section title="Drawing the stamps">
          <p>
            The best-known places have their own illustrated stamp, over 1,500 so far, all in one ink-and-wash
            style. I tried Gemini, Ming Image, Recraft and Meta’s Muse Image on the same 20 landmarks, and Muse
            got buildings right most often, at about a cent a picture. Words alone kept failing on complicated
            buildings, so a Claude Sonnet agent now describes each place from a photo of it, Muse draws from that
            description, and another Sonnet agent compares the drawing with the photo. Where that still goes
            wrong, Gemini 3 Pro Image redraws straight from the photo, changing only the style.
          </p>
          <p>
            Then people checked them. We split the pictures between us by country and compared each one with
            the real place, on a review page I built for it. I marked about one in six of mine as wrong, and a
            flagged picture goes back to be drawn again, from a photo.
          </p>
          <p>
            The Wonders, like the Colosseum or Mount Fuji, open to a stamp of their own, with gold-foil lettering
            that catches the light as you tilt your phone, and a depth map, made with Depth Anything, so the near
            parts of the picture shift more than the far ones.
          </p>
        </Section>

        <Section title="Making it feel native">
          <p>
            Stamplyn is built with Expo and React Native, for iPhone and Android, and I wanted it to feel at home
            on the phone, not like a website inside an app. So I spent a lot of time studying apps that do: how they respond to
            a touch, and where they use a sound or a haptic. On iPhone it uses Apple’s new Liquid Glass look.
          </p>
          <p>
            I’ve paid close attention to how products are made ever since I was a kid, and that left me with an
            intuition I lean on a lot. I designed Stamplyn too: the name, the icon of a stamp with its corner
            peeled back, and the screens.
          </p>
        </Section>
      </div>
    </>
  )
}
