"use client";
import Image from "next/image";
import { Navigation } from "./navigation";
import { UserButton } from "./user-button";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch the token only on the client side
  useEffect(() => {
    const tokenFromCookie = getCookie("nwl-token");
    setToken(tokenFromCookie ? String(tokenFromCookie) : null);
    setLoading(false); // Set loading to false after fetching the token
  }, []);

  // Show nothing while loading
  if (loading) {
    return null; // Or return a loading spinner/skeleton
  }

  return (
    <div className="w-full py-4 border-b hidden md:flex justify-around">
      <Image src="./longLogo.svg" alt="logo" height={52} width={152} />

      <Navigation />

      {/* Render UserButton or login/signup buttons based on token */}
      {token ? (
        <UserButton />
      ) : (
        <div className="flex items-center space-x-2">
            <Button
            variant="outline"
            asChild
            className="relative border-2 bg-black text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,100,0,1)]"
          >
            <Link href="/sign-in" className="absolute left-2">
              Sign Up
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="relative border-2 bg-white text-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(255,255,2,1)]"
          >
            <Link href="/log-in" className="absolute left-2">
              Log In
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
