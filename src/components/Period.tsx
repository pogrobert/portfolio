// A span of years as written, "2021–2022" or an open-ended "2026–". Screen readers drop
// the dash, so an open end gets a hidden "present".
export function Period({ period }: { period: string }) {
  if (!period.endsWith('–')) return <>{period}</>
  return (
    <>
      {period}
      <span className="sr-only"> present</span>
    </>
  )
}
