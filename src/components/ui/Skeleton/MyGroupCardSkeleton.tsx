'use client';

export default function MyGroupCardSkeleton() {
  return (
    <article
      className="relative flex h-[390px] w-full animate-pulse cursor-default flex-col gap-4 rounded-lg bg-white shadow-md sm:h-[236px] sm:flex-row sm:p-6 md:gap-6"
      aria-hidden>
      <div className="absolute top-5 right-5 h-12 w-12 rounded-full bg-gray-100" />

      <div className="relative h-[156px] w-full overflow-hidden rounded-t-lg bg-gray-100 sm:h-[188px] sm:w-[188px] sm:rounded-xl" />

      <div className="flex h-full min-w-0 flex-1 flex-col justify-between px-4 pb-5 sm:p-0">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-8 w-20 rounded bg-gray-100" />
            <div className="h-8 w-24 rounded border border-gray-200" />
          </div>

          <div className="mt-4 h-6 w-3/5 rounded bg-gray-100 sm:mt-2" />
        </div>

        <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:items-center">
          <div className="tag flex w-full flex-col gap-[6px] sm:gap-[10px]">
            <div className="flex h-4 items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-100" />
              <div className="h-4 w-16 rounded bg-gray-100" />
            </div>

            <section className="mt-2 flex flex-nowrap items-center gap-2">
              <div className="h-6 w-16 rounded-full border border-gray-200" />
              <div className="h-6 w-24 rounded-full border border-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-100" />
            </section>
          </div>

          <div className="mt-4 sm:mt-0">
            <div className="h-[44px] w-[132px] rounded-md bg-gray-100 sm:h-[48px] sm:w-[120px] md:h-[48px] md:w-[156px]" />
          </div>
        </div>
      </div>
    </article>
  );
}
