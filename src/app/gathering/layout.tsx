import FindBanner from './[tab]/_components/FindBanner';

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
