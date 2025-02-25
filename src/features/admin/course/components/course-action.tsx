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
// import { EditcourseFormWrapper } from "./edit-course-form-wrapper";
import { ResponsiveModel } from "@/components/responsive-model"; // Import ResponsiveModel
import { useConfirm } from "@/hooks/use-confirm";
import Link from "next/link";
// import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useDeleteCourse } from "../api/use-delete-course";
import { EditCourseFormWrapper } from "./edit-course-form-wrapper";
// import { AddCourseTocourse } from "./add-courseCourse";

interface CourseActionProps {
  id: string;
  courseSlug: string;
}

export const CourseAction = ({ id, courseSlug }: CourseActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenAddCourse, setIsOpenAddCourse] = useState(false);
  const { mutate, isPending } = useDeleteCourse();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete course",
    "Are you sure you want to delete this course?",
    "destructive"
  );
  

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium p-[10px] ">
            <Link
              href={`/admin/course/${courseSlug}`}
              className="flex items-center gap-2"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Course Details
            </Link>
          </DropdownMenuItem>
          {/* Open Dialog when clicking Edit */}
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onSelect={() => setIsOpen(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Course
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px] hover:bg-red-700"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wrap inside ResponsiveModel */}
      <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[75vw]">
        <EditCourseFormWrapper id={id} setIsOpen={setIsOpen} />
      </ResponsiveModel>


      {/* {isOpenAddCourse && (
        <ResponsiveModel isOpen={isOpenAddCourse} setIsOpen={setIsOpenAddCourse} className="max-w-lg">
          <AddCourseTocourse
            isOpen={isOpenAddCourse}
            setIsOpen={setIsOpenAddCourse}
            courseId={id}
          />
        </ResponsiveModel>
      )} */}

      <ConfirmationDialog />
    </>
  );
};
