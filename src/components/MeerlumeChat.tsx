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
const chatUrl = 'https://go.meerlume.com/c/DK6DEPY'
let mounts = 0

export function MeerlumeChat() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chatUrl || !container.current) return
    const target = document.createElement('div')
    target.id = `meerlume-chat-${++mounts}`
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

  if (!chatUrl) return null
  return (
    <div ref={container} className="mt-8 h-[560px] overflow-hidden rounded-2xl border border-line" />
  )
}
