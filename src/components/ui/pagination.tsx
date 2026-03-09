import { Button } from "@/components/ui/button"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="xs"
        className="rounded-full px-3"
        disabled={page === 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        Prev
      </Button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange?.(p)}
          className={`h-7 w-7 rounded-full text-xs font-medium ${
            p === page
              ? "bg-black text-white"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          {p}
        </button>
      ))}
      <Button
        variant="outline"
        size="xs"
        className="rounded-full px-3"
        disabled={page === totalPages}
        onClick={() => onPageChange?.(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}

