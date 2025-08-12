export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="h-8 bg-muted animate-pulse rounded" />
      <div className="grid gap-4 md:grid-cols-3 h-[calc(100vh-8rem)]">
        <div className="md:col-span-1 bg-muted animate-pulse rounded" />
        <div className="md:col-span-2 bg-muted animate-pulse rounded" />
      </div>
    </div>
  )
}
