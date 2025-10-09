import type { Metadata } from 'next';
import './globals.css';
import { Pretendard } from '../lib/font';

export const metadata: Metadata = {
  title: {
    default: 'UP DO - 성장 커뮤니티',
    template: '%s | UP DO',
  },
  description: '자기계발에 진심인 사람들을 위한 모임 플랫폼',
  keywords: ['UPDO', '자기계발', '성장', '모임', '커뮤니티', '네트워킹', '챌린지'],
  authors: [{ name: 'UP DO', url: 'https://team7-updo.vercel.app' }],
  metadataBase: new URL('https://team7-updo.vercel.app'),
  openGraph: {
    title: 'UP DO',
    description: '자기계발에 진심인 사람들을 위한 모임 플랫폼',
    url: 'https://team7-updo.vercel.app',
    siteName: 'UP DO',
    images: [
      {
        url: '/images/og-default.png',
        width: 600,
        height: 315,
        alt: 'UP DO 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UP DO',
    description: '자기계발에 진심인 사람들을 위한 모임 플랫폼',
    images: ['/images/og-default.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
