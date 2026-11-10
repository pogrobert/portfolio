// A view transition moves each named element by animating its group's position, width
// and height. Width and height can't run on the compositor, so in Safari the whole move
// runs on the main thread, and any other work at that moment (decoding the home page's
// paintings on the way back, say) drops frames. This rewrites each group's animation to
// hold the final size and animate position and scale instead, which the compositor runs
// on its own. A painting keeps its shape between a card and a case study, so it scales
// evenly; the site name changes shape slightly, for a moment too short to see. This is
// the technique Bramus (Bram Van Damme) describes in "More performant ::view-transition-group(*)
// animations".
//
// It wraps document.startViewTransition, so it covers every page transition. Where the
// browser doesn't expose the animations it does nothing, and the default animation runs.
//
// The same wrapper keeps an element that's out of view from travelling. A painting or the
// site name moves between its places on the two pages, and if either place is off screen
// it would fly in from past the edge of the window, or out past it: as when a visitor
// scrolls down a case study and goes back, and the painting comes down from above the
// top. So each is measured on the page being left, before its picture is taken, and
// again on the new page once it's in place and scrolled to where it will sit. One that's
// mostly out of view is marked, and the mark takes its name away (styles.css): it stays
// part of its page and fades with it, and its partner on the other page fades too.

const group = '::view-transition-group('

function px(value: unknown) {
  return typeof value === 'string' && value.endsWith('px') ? Number.parseFloat(value) : Number.NaN
}

function scaleGroups() {
  for (const animation of document.getAnimations()) {
    const effect = animation.effect
    if (!(effect instanceof KeyframeEffect) || !effect.pseudoElement?.startsWith(group)) continue
    const [from, to] = effect.getKeyframes()
    if (!from || !to || from.offset !== 0 || to.offset !== 1) continue
    const fromWidth = px(from.width)
    const fromHeight = px(from.height)
    const toWidth = px(to.width)
    const toHeight = px(to.height)
    if (![fromWidth, fromHeight, toWidth, toHeight].every((n) => n > 0)) continue
    const keep = (frame: ComputedKeyframe, transform: unknown) => ({
      offset: frame.offset,
      easing: frame.easing,
      composite: frame.composite,
      transform: String(transform),
    })
    // The group holds its final size throughout; it starts scaled down (or up) to the old
    // size, from its top-left corner (transform-origin is 0 0, see styles.css).
    const sx = fromWidth / toWidth
    const sy = fromHeight / toHeight
    const same = Math.abs(sx - 1) < 0.001 && Math.abs(sy - 1) < 0.001
    effect.setKeyframes([
      keep(from, same ? from.transform : `${from.transform} scale(${sx}, ${sy})`),
      keep(to, to.transform),
    ])
  }
}

const travellers = '[data-painting], [data-site-name]'

// At least a third of it has to show. A card at the foot of the window is often cut off
// and still plainly the thing that was clicked; a sliver isn't worth flying to.
const enoughInView = 1 / 3

function markOutOfView() {
  for (const element of document.querySelectorAll<HTMLElement>(travellers)) {
    const box = element.getBoundingClientRect()
    const width = Math.min(box.right, window.innerWidth) - Math.max(box.left, 0)
    const height = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0)
    const shown = width > 0 && height > 0 ? (width * height) / (box.width * box.height) : 0
    element.toggleAttribute('data-out-of-view', shown < enoughInView)
  }
}

export function composeViewTransitions() {
  if (typeof document === 'undefined' || !('startViewTransition' in document)) return
  // Hot reloads run this again; wrap only once.
  const marked = document as Document & { __composedViewTransitions?: boolean }
  if (marked.__composedViewTransitions) return
  marked.__composedViewTransitions = true
  const start = document.startViewTransition.bind(document)
  document.startViewTransition = ((options?: Parameters<typeof start>[0]) => {
    markOutOfView()
    const update = typeof options === 'function' ? options : options?.update
    const updateThenMark = async () => {
      await update?.()
      markOutOfView()
    }
    const transition = start(
      typeof options === 'function' || !options ? updateThenMark : { ...options, update: updateThenMark },
    )
    transition.ready
      .then(() => {
        try {
          scaleGroups()
        } catch {
          // Leave the default animation to run.
        }
      })
      .catch(() => {})
    return transition
  }) as typeof document.startViewTransition
}
