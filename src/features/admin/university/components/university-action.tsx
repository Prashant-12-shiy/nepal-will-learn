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
import { useConfirm } from "@/hooks/use-confirm";


interface CollegeActionProps {
  id: string;
}

export const UniversityAction = ({ id }: CollegeActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // const {mutate, isPending} = useDeleteCollege();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete College",
    "Are you sure you want to delete this university?",
    "destructive"
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if(!ok) return;

    // mutate(id);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium p-[10px]">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            University Details
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
            disabled={false}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px] hover:bg-red-700"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete University
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wrap inside ResponsiveModel */}
      {/* <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen}>
        <EditCollegeFormWrapper id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      </ResponsiveModel> */}

      <ConfirmationDialog/>
    </>
  );
};
