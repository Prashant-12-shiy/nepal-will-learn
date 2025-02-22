import { Navbar } from "@/components/navbar";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-screen-2xl h-full">
        <Navbar/>
        <main> {children}</main>
      </div>
    </div>
  );
}
