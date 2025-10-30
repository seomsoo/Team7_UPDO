import { cn } from '@/utils/cn';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageClick(page);
    }
  };

  const generatePages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 5) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex w-full items-center justify-center gap-0.5 sm:gap-1">
      <button
        className={cn(
          'mr-2 cursor-pointer rounded-sm sm:h-12 sm:w-12',
          currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'sm:hover:bg-[var(--gray-100)] sm:active:bg-[var(--gray-200)]',
        )}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        aria-disabled={currentPage === 1}>
        ◀
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`dots-${index}`}
            className="sm:typo-base px-2 text-xs text-[var(--gray-500)] select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            onKeyDown={e => handleKeyDown(e, page)}
            className={cn(
              'typo-base h-8 w-8 cursor-pointer rounded-sm font-bold transition-colors sm:h-12 sm:w-12',
              page === currentPage
                ? 'bg-[var(--purple-50)] text-[var(--purple-550)]'
                : 'font-normal text-[var(--gray-500)] hover:bg-[var(--gray-100)]',
            )}
            aria-current={page === currentPage ? 'page' : undefined}>
            {page}
          </button>
        ),
      )}

      <button
        className={cn(
          'ml-2 cursor-pointer rounded-sm text-xs sm:h-12 sm:w-12 sm:text-base',
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'sm:hover:bg-[var(--gray-100)] sm:active:bg-[var(--gray-200)]',
        )}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        aria-disabled={currentPage === totalPages}>
        ▶
      </button>
    </div>
  );
};
