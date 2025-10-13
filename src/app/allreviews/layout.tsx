import { Banner } from '@/components/ui/common/Banner';

/**
 * Layout component that renders a banner followed by a main content area.
 *
 * @param children - Content to be rendered inside the layout's main element
 * @returns A React element containing a Banner (title "모든 리뷰", description "UPDO 이용자들은 이렇게 느꼈어요 🌟", image "/images/reviews_banner.png") followed by a <main> wrapping `children`
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner
        title="모든 리뷰"
        description="UPDO 이용자들은 이렇게 느꼈어요 🌟"
        imageSrc="/images/reviews_banner.png"
      />
      <main>{children}</main>
    </>
  );
}