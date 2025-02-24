"use client"
import { useGetCurrent } from "@/features/auth/api/use-get-current";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PageLoader } from "./page-loader";
import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useLogout } from "@/features/auth/api/use-logout";

export const UserButton = () => {
  const { data, isLoading } = useGetCurrent();
  const handleLogout = useLogout();

  if (isLoading) {
    <PageLoader />;
  }

  if (!data) {
    return null;
  }

  const { user } = data;

  const { name, email, profilePic } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="py-2 px-2 flex items-center justify-between w-fit gap-3 md:border rounded-[60px] max-md:my-4">
          <div className="flex-col flex">
            <Avatar>
              {profilePic ? (
                <AvatarImage
                  src={profilePic}
                  alt={name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback>{name[0]}</AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="hidden md:block">
            <p className="font-semibold text-sm">{name}</p>
            <p className="trancate text-neutral-500 text-xs">{email}</p>
          </div>
          <div>
            <ChevronDownIcon className="size-4 hidden md:block" />
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center jusitfy-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-400 font-medium text-neutral-500 flex text-xl items-center justify-center">
              {name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-neutral-900">
            {name || "User"}
          </p>
          <p className="text-xs text-neutral-500">{email}</p>
        </div>
        <Separator className="mb-1" />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="h-10 flex items-center justify-center text-center font-medium cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="h-10 flex items-center justify-center text-center font-medium cursor-pointer">
            My Course
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="h-10 flex items-center justify-center text-center font-medium cursor-pointer">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          {/* <LogOut className="size-4 mr-2" /> */}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
