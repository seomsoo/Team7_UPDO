import FindBanner from './[tab]/_components/FindBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <FindBanner />
        </div>
        {children}
      </div>
    </div>
  );
}
