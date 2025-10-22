export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-col">
        <main>{children}</main>
      </div>
    </div>
  );
}
