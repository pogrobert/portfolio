import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { composeViewTransitions } from './viewTransitions'

export function getRouter() {
  // Keeps page transitions on the compositor (see viewTransitions.ts).
  composeViewTransitions()
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    // Moving to another page animates (see the View Transition rules in styles.css).
    defaultViewTransition: { types: ['page'] },
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
