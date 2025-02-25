import { useGetCourses } from "../../course/api/use-get-course";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseData } from "../../course/types";
import { useAddCollegeCourse } from "../api/update-college-course";

interface AddCourseToCollegeProps {
  setIsOpen: (value: boolean) => void;
  collegeId: string;
}

export const AddCourseToCollege = ({
  setIsOpen,
  collegeId,
}: AddCourseToCollegeProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
  const { data, isLoading } = useGetCourses();
  const courses = data?.course;

  const { mutate, isPending } = useAddCollegeCourse();

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(
      (prev) =>
        prev.includes(courseId)
          ? prev.filter((id) => id !== courseId) // Deselect if already selected
          : [...prev, courseId] // Add to selection
    );
  };

  const handleAddCourse = () => {
    const data = {
        courses: selectedCourses,
    };
    mutate({ data, id: collegeId }, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!courses) {
    return <p>No courses available.</p>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <h2>Enter the course name to add: </h2>
      <PopoverTrigger className="flex items-start w-full">
        <Button variant="secondary" role="combobox">
          {selectedCourses.length > 0
            ? `${selectedCourses.length} courses selected`
            : "Select Courses"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <CommandInput placeholder="Search Course" />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course: CourseData) => (
                <CommandItem
                  key={course._id}
                  value={course._id}
                  onSelect={() => handleSelectCourse(course._id ?? "")} // Handle selection
                >
                  {course.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedCourses.includes(course._id ?? "")
                        ? "opacity-100"
                        : "opacity-0" // Show checkmark if selected
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <div className="justify-around flex *:w-full gap-3 my-5">
        <Button
          type="button"
          disabled={isPending}
          onClick={() => handleAddCourse()}
        >
          Add Course
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Popover>
  );
};
