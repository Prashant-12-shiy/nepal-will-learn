"use client";

import { useGetUniversityById } from "../api/use-get-university-id";
import { EditUniversityForm } from "./edit-university-form";


interface EditUniversityFormWrapperProps {
  id: string;
  setIsOpen: (open: boolean) => void;
}

export const EditUniversityFormWrapper = ({
  id,
  setIsOpen,
}: EditUniversityFormWrapperProps) => {
  const { data, isLoading } = useGetUniversityById(id);
  const initialValues = data?.university;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
        <EditUniversityForm
          initialValues={initialValues} // Pass initial values to the form
          onCancel={() => setIsOpen(false)} // Close the dialog on cancel
        />
  );
};
