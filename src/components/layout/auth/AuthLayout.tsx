'use client';
import Image from 'next/image';

// CSR-only 구조를 유지하면서도 Next Image의 SSR 관여를 완전히 제거
import dynamic from 'next/dynamic';
const SafeImage = dynamic(() => import('next/image'), { ssr: false });

export default function AuthLayout({
  title,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  children,
}: {
  title: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
  children: React.ReactNode;
}) {
  return (
    <main className="box-border flex h-auto w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 md:flex-row md:gap-14 md:px-12 xl:gap-20 xl:px-20">
      {/* ✅ 단일 이미지: 위치/크기 모두 반응형 클래스만으로 제어 */}
      <div className="mt-10 flex w-full justify-center md:mt-0 md:w-[48%] md:justify-end xl:w-[45%]">
        <Image
          src="/images/auth_logo.png"
          alt="Auth Illustration"
          width={529}
          height={345}
          priority
          // 크기 전환: 모바일 → 태블릿 → 데스크톱
          className="h-[212px] w-[275px] object-contain sm:h-[240px] sm:w-[340px] md:h-[345px] md:w-[529px]"
        />
      </div>

      <section className="box-border flex w-[343px] flex-col items-center justify-center rounded-xl bg-white px-[56px] pt-[44px] pb-[44px] shadow-md sm:w-[568px] md:w-[568px]">
        <h1 className="mb-6 w-full text-center text-3xl font-semibold text-gray-800">{title}</h1>

        <div className="w-full flex-grow">{children}</div>

        <p className="mt-4 w-full text-left text-sm text-gray-600">
          {bottomText}{' '}
          <a href={bottomLinkHref} className="text-purple-600 hover:underline">
            {bottomLinkText}
          </a>
        </p>
      </section>
    </main>
  );
}
