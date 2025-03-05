"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UniversityData } from "../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { UniversityAction } from "./university-action";
import Image from "next/image";

export const columns: ColumnDef<UniversityData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          University Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "logo",
    header: () => {
      return <Button variant="ghost">Logo</Button>;
    },
    cell: ({ row }) => {
      const logo = row.original.logo;
      return (
        <Image
          src={logo as string}
          alt="logo"
          className="text-xs flex items-center justify-center"
          width={30}
          height={30}
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const location = row.original.location;
      return <p>{location}</p>;
    },
  },

  {
    accessorKey: "establishedYear",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Established Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const establishedYear = row.original.establishedYear;
      return (
        <p className="flex items-center justify-center">{establishedYear}</p>
      );
    },
  },
  // {
  //   accessorKey: "courses",
  //   header: "Courses",
  //   cell: ({ row }) => {
  //     const courses = row.original.courses.join(", ") ;
  //     return <p className="line-clamp-2">{courses}</p>;
  //   },
  // },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return <p className="truncate">{email || "-"}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <p>{phone || "-"}</p>;
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const website = row.original.website;
      return (
        <p className="truncate max-w-16">
          <Link
            href={website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {website || "-"}
          </Link>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const slug = row.original.slug;

      return <UniversityAction id={id ?? ""} slug={slug ?? ""} />;
    },
  },
];
