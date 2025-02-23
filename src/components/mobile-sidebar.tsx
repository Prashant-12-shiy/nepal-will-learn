"use client"

import { MenuIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "./navbar"
import { Navigation } from "./navigation"
import { UserButton } from "./user-button"
import Image from "next/image"
import { Separator } from "./ui/separator"

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) { // `md` breakpoint is 768px
            setIsOpen(false);
          }
        };
    
        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
    
        // Initial check on component mount
        handleResize();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-10">
                    <div>
                        <Image src="./longLogo.svg" alt="logo" height={52} width={152}/>
                    </div>
                    <Separator className="my-4"/>
                     <Navigation/>
            </SheetContent>
        </Sheet>
    )
}