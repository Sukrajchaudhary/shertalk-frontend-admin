export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="h-8 bg-muted animate-pulse rounded" />
      <div className="space-y-4">
        <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
        <div className="h-32 bg-muted animate-pulse rounded" />
      </div>
    </div>
  )
}
