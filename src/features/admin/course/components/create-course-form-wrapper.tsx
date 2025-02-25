"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCourseForm } from "./create-course-form";
import { useGetUniversities } from "../../university/api/use-get-universities";

interface CreateCourseFormWrapperProps {
  setIsOpen: (open: boolean) => void;
}

export const CreateCourseFormWrapper = ({
  setIsOpen,
}: CreateCourseFormWrapperProps) => {
  const { data: universitiesData, isLoading } = useGetUniversities();
  const universities = universitiesData?.university;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <DialogHeader className="mb-5">
        <DialogTitle>Create Course</DialogTitle>
        <DialogDescription>
          Fill out the form to create a new course.
        </DialogDescription>
      </DialogHeader>
      <CreateCourseForm
        universities={universities}
        onCancel={() => setIsOpen(false)} // Close the dialog on cancel
      />
    </div>
  );
};
