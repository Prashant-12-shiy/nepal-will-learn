"use client";

import { useGetUniversities } from "../../university/api/use-get-universities";
import { useGetCourseById } from "../api/use-get-course-id";
import { EditCourseForm } from "./edit-course-form";

interface EditCourseFormWrapperProps {
  setIsOpen: (open: boolean) => void;
  id: string;
}

export const EditCourseFormWrapper = ({
  id,
  setIsOpen,
}: EditCourseFormWrapperProps) => {
  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseById(id);
  const { data: univeristiesData, isLoading: isLoadingUniveristies } =
    useGetUniversities();
  const initialValues = courseData?.course;

  const univeristies = univeristiesData?.university;

  const isLoading = isLoadingCourse || isLoadingUniveristies;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <EditCourseForm
      universities={univeristies}
      initialValues={initialValues} // Pass initial values to the form
      onCancel={() => setIsOpen(false)} // Close the dialog on cancel
    />
  );
};
