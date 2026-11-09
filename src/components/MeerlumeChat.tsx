import { useEffect, useRef } from 'react'

// A live Meerlume bot, embedded with Meerlume's own inline widget: widget.js mounts the
// chat in an iframe inside the container. The bot answers questions about Meerlume and
// takes messages for Robert, so conversations count against his account's allowance
// and land in its inbox.
//
// The script is added after hydration, not rendered: a <script> in React markup never
// runs, and the prerendered page shouldn't wait on a third-party script. Leaving the
// page removes both the script and the chat it mounted.
//
// A removed script still runs once it has started loading, and inline mode has no
// guard against running twice (React mounts twice in development, and navigating
// away and back mounts again). So each mount gets its own target: a script that runs
// after its mount is gone finds nothing to mount into.
//
// Under the chat sits a line with a link to the bot's own page, for when the script or the
// chat is blocked or slow. The chat's page has a background of its own, so it covers the
// line once it's drawn; the line waits two seconds before it fades in, so a chat that
// loads as usual never shows it.
const chatUrl = 'https://go.meerlume.com/c/DK6DEPY'
let mounts = 0

export function MeerlumeChat() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    const target = document.createElement('div')
    target.id = `meerlume-chat-${++mounts}`
    // Positioned, so it's drawn over the line under it.
    target.className = 'relative'
    container.current.append(target)
    const script = document.createElement('script')
    script.src = 'https://meerlume.com/widget.js'
    script.async = true
    script.dataset.chat = chatUrl
    script.dataset.target = `#${target.id}`
    script.dataset.height = '560'
    document.body.append(script)
    return () => {
      script.remove()
      target.remove()
    }
  }, [])

  return (
    <div ref={container} className="relative mt-8 h-[560px] overflow-hidden rounded-2xl border border-line">
      <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted transition-opacity delay-[2s] duration-200 starting:opacity-0">
        <span>
          If the chat doesn’t load,{' '}
          <a href={chatUrl}>
            open it on its own page <span aria-hidden="true">↗</span>
          </a>
          .
        </span>
      </p>
    </div>
  )
}
