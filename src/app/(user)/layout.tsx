import { MobileSidebar } from "@/components/mobile-sidebar";
import { Navbar } from "@/components/navbar";
import { UserButton } from "@/components/user-button";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-screen-2xl h-full">
        <Navbar />
        <div className="flex items-center justify-between w-full md:hidden">
          <MobileSidebar />
          <UserButton />
        </div>
        <main className="h-full py-8 px-6 flex flex-col"> {children}</main>
      </div>
    </div>
  );
}
