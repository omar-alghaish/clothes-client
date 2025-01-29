'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const getVisiblePages = () => {
    const visiblePages = []
    // Always show first page
    visiblePages.push(1)
    
    // Show current page and siblings
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)
    
    if (startPage > 2) visiblePages.push('...')
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i)
    }
    if (endPage < totalPages - 1) visiblePages.push('...')
    
    // Always show last page if different from first
    if (totalPages > 1) visiblePages.push(totalPages)
    
    return visiblePages
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          asChild={currentPage > 1}
        >
          {currentPage > 1 ? (
            <Link href={createPageURL(currentPage - 1)}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" />
            </>
          )}
        </Button>

        {/* Page Numbers - Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <Button variant="outline" size="sm" className="pointer-events-none">
            {currentPage}
          </Button>
          <span className="mx-1">of</span>
          <Button variant="outline" size="sm" asChild>
            <Link href={createPageURL(totalPages)}>{totalPages}</Link>
          </Button>
        </div>

        {/* Page Numbers - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <span key={index} className="flex items-center">
              {page === '...' ? (
                <span className="px-2 py-1">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  asChild
                >
                  <Link href={createPageURL(page)}>{page}</Link>
                </Button>
              )}
            </span>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          asChild={currentPage < totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={createPageURL(currentPage + 1)}>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Page Count Text */}
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default Pagination