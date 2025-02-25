"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CourseData } from "../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CourseAction } from "./course-action";

export const CourseColumns: ColumnDef<CourseData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
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
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const duration = row.original.duration;
      return <p className="flex items-center justify-start">{duration} Years</p>;
    },
  },
  {
    accessorKey: "fees",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          fees
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fees = row.original.fees;
      return <p className="flex items-center justify-start">Rs {fees}</p>;
    },
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    cell: ({ row }) => {
      const affiliation = row.original.affiliation;
      return <p>{affiliation?.name}</p>;
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.original.level;
      return <p className="truncate">{level}</p>;
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      const id = row.original._id;
      const slug = row.original.slug;      

      return (
        <CourseAction id={id ?? ""} courseSlug={slug ?? ""}/>
      )
    }
  }
];
