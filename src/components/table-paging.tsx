"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function TablePaging({
  totalPages,
  page,
  pageSize,
  isShowPaging = true,
}: {
  totalPages: number;
  page: number;
  pageSize: number;
  isShowPaging?: boolean;
}) {
  function getPaginationPages(currentPage: number, totalPages: number, maxVisible = 5) {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);

      if (start === 1) {
        end = maxVisible;
      } else if (end === totalPages) {
        start = totalPages - maxVisible + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (start > 2) {
        pages.unshift("...");
        pages.unshift(1);
      } else if (start === 2) {
        pages.unshift(1);
      }

      if (end < totalPages - 1) {
        pages.push("...");
        pages.push(totalPages);
      } else if (end === totalPages - 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }

  const searchParams = useSearchParams();

  const getUpdatedUrl = (newPage: number | string, pageSize: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', String(newPage));
    params.set('pageSize', String(pageSize));
    return `?${params.toString()}`;
  };
  
  const pages = getPaginationPages(page, totalPages);
  return (
    <>
      {isShowPaging && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {
                page - 1 >= 1 &&
                <PaginationPrevious href={getUpdatedUrl(page - 1, pageSize)}>
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationPrevious>
              }
            </PaginationItem>

            {pages.map((p, idx) => (
              <PaginationItem key={idx}>
                {p === "..." ? (
                  <span className="px-2">...</span>
                ) : (
                  <PaginationLink isActive={p === page} href={getUpdatedUrl(p, pageSize)}>
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              {
                page + 1 <= totalPages &&
                <PaginationNext href={getUpdatedUrl(page + 1, pageSize)}>
                  <ChevronsRight className="h-4 w-4" />
                </PaginationNext>
              }
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}