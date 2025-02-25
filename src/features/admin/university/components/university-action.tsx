"use client"
import { useState } from "react";
import {
  ExternalLinkIcon,
  MoreVertical,
  TrashIcon,
  PencilIcon,
} from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { ResponsiveModel } from "@/components/responsive-model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditUniversityFormWrapper } from "./edit-university-form-wrapper";
import { useDeleteUniversity } from "../api/use-delete-university";
import Link from "next/link";


interface CollegeActionProps {
  slug: string;
  id: string;
}

export const UniversityAction = ({ id, slug }: CollegeActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {mutate, isPending} = useDeleteUniversity();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete University",
    "Are you sure you want to delete this university?",
    "destructive"
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if(!ok) return;

    mutate(id);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium p-[10px] " >
            <Link href={`/admin/university/${slug}`} className="flex gap-2">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            University Details
            </Link>
          </DropdownMenuItem>
          {/* Open Dialog when clicking Edit */}
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onSelect={() => setIsOpen(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit University
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px] hover:bg-red-700"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete University
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wrap inside ResponsiveModel */}
      <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[75vw]">
        <EditUniversityFormWrapper id={id} setIsOpen={setIsOpen} />
      </ResponsiveModel>

      <ConfirmationDialog/>
    </>
  );
};
