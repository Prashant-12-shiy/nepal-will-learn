import Link from "next/link";
import React from "react";
import {
  LayoutPanelLeft,
  School,
  BookMarked,
  ChartColumnStacked,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationData = [
  {
    title: "Home",
    url: "/", // Use "/user" instead of an empty string
    icon: <LayoutPanelLeft />,
  },
  {
    title: "University",
    url: "/university",
    icon: <School />,
  },
  {
    title: "Course",
    url: "/course",
    icon: <BookMarked />,
  },
  {
    title: "Category",
    url: "/category",
    icon: <ChartColumnStacked />,
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center p-0.5 rounded-[60px] w-fit md:border border-neutral-300 h-14">
      <ul className="block md:flex justify-center gap-2 xl:gap-14 h-full max-md:*:mb-3">
        {navigationData.map((navigation, index) => {
          const isActive = pathname === (navigation.url); // Check if the path starts with the URL

          return (
            <li key={index} >
              <Link
                href={navigation.url}
                className={cn(
                  "flex items-center gap-2 rounded-[60px] h-full px-6",
                  isActive
                    ? " border-neutral-300 shadow-sm md:border-2" // Active state styles
                    : "text-neutral-600 hover:text-blue-600 " // Hover state styles
                )}
                aria-current={isActive ? "page" : undefined} // Accessibility improvement
              >
                {React.cloneElement(navigation.icon, {
                  className: cn(
                    "size-4",
                    isActive ? "text-blue-600" : "text-neutral-600" // Dynamic icon color
                  ),
                })}
                <span>{navigation.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};