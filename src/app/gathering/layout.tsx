import FindBanner from './[tab]/_components/FindBanner';

/**
 * Layout component that renders a FindBanner above provided content.
 *
 * @param children - Content to render below the FindBanner
 * @returns A React fragment containing the FindBanner followed by `children`
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <FindBanner />
      </div>
      {children}
    </>
  );
}