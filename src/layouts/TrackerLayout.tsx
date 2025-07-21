interface ChildrenProps {
  children: React.ReactNode;
}

export default function TrackerLayout({ children }: ChildrenProps) {
  return (
    <>
      <main className="w-full min-h-screen grid grid-cols-6 grid-rows-[100px_1fr_3fr] p-4 shadow-xl font-roboto gap-4">
        {children}
      </main>
    </>
  );
}
