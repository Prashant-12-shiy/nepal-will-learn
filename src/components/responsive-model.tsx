"use client";
import { useMedia } from "react-use";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className: string;
}

export const ResponsiveModel = ({ children, isOpen, setIsOpen , className}: ResponsiveModelProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn("w-full p-5 border-none overflow-y-auto hide-scrollbar max-h-[85vh]", className)}>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar px-3 max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
