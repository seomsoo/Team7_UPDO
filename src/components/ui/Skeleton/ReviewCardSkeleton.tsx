'use client';

export default function ReviewCardSkeleton({ variant = 'all' }: { variant?: 'my' | 'all' }) {
  const mdCols = variant === 'all' ? 'md:grid-cols-[300px_1fr]' : 'md:grid-cols-[200px_1fr]';

  return (
    <article className="w-full animate-pulse cursor-default rounded-xl border-0" aria-hidden>
      <div
        className={`grid grid-cols-[80px_1fr] items-start gap-3 overflow-x-hidden sm:grid-cols-[200px_1fr] md:items-stretch md:gap-6 ${mdCols}`}>
        <header className="col-span-2 flex items-center gap-3 sm:col-start-2 sm:row-start-1 md:col-start-2 md:row-start-1">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100" />

          <div className="flex min-w-0 flex-col">
            <div className="h-4 w-40 max-w-[160px] rounded bg-gray-100 sm:max-w-[220px]" />
            <div className="mt-0.5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-gray-100" />
                <div className="h-3 w-3 rounded bg-gray-100" />
                <div className="h-3 w-3 rounded bg-gray-100" />
                <div className="h-3 w-3 rounded bg-gray-100" />
                <div className="h-3 w-3 rounded bg-gray-100" />
              </div>
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
          </div>
        </header>

        <div className="typo-sm col-span-2 row-start-2 mt-1 text-gray-500 sm:hidden">
          <div className="inline-flex items-center gap-2 align-middle">
            <div className="h-3 w-px bg-gray-200" />
            <div className="h-3 w-24 rounded bg-gray-100" />
          </div>
        </div>

        <figure className="relative col-start-1 row-start-3 h-[80px] overflow-hidden rounded-lg bg-gray-100 sm:row-span-2 sm:row-start-1 sm:h-[200px] md:row-span-2 md:row-start-1 md:h-[200px]" />

        <section className="col-start-2 row-start-3 mt-2 flex min-w-0 flex-col justify-center sm:row-start-2 sm:mt-0 md:row-span-1 md:row-start-2">
          <div className="typo-sm hidden text-gray-500 sm:flex">
            <div className="flex items-center gap-2">
              <div className="h-3 w-px bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-100" />
            </div>
          </div>

          <div className="mt-2 space-y-2 sm:mt-2">
            <div className="h-4 w-11/12 rounded bg-gray-100" />
            <div className="h-4 w-10/12 rounded bg-gray-100" />
            <div className="h-4 w-7/12 rounded bg-gray-100" />
          </div>
        </section>
      </div>
    </article>
  );
}
