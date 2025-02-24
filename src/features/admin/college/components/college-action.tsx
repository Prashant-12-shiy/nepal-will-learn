import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLinkIcon,
  MoreVertical,
  TrashIcon,
  PencilIcon,
} from "lucide-react";
import { useState } from "react";
import { EditCollegeFormWrapper } from "./edit-college-form-wrapper";
import { ResponsiveModel } from "@/components/responsive-model"; // Import ResponsiveModel
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCollege } from "../api/use-delete-college";
import Link from "next/link";

interface CollegeActionProps {
  id: string;
  collegeSlug: string;
}

export const CollegeAction = ({ id, collegeSlug }: CollegeActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {mutate, isPending} = useDeleteCollege();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete College",
    "Are you sure you want to delete this college?",
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
          <DropdownMenuItem className="font-medium p-[10px] ">
            <Link href={`/admin/college/${collegeSlug}`} className="flex items-center gap-2">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            College Details
            </Link>
          </DropdownMenuItem>
          {/* Open Dialog when clicking Edit */}
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onSelect={() => setIsOpen(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit College
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px] hover:bg-red-700"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete College
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wrap inside ResponsiveModel */}
      <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen}>
        <EditCollegeFormWrapper slug={collegeSlug} setIsOpen={setIsOpen} />
      </ResponsiveModel>

      <ConfirmationDialog/>
    </>
  );
};
