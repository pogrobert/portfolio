import { useEffect, useState } from 'react'
import { site } from '../content/site'

const format = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.timeZone,
  hour: '2-digit',
  minute: '2-digit',
})

// Pages are prerendered, so the time is filled in only in the browser; the
// build-time HTML shows just the city.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span>
      {site.location}
      {time && <> · {time} GMT+4</>}
    </span>
  )
}
