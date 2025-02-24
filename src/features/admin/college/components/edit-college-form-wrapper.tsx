"use client";

import { useGetCollegeById } from "../api/use-get-college";
import { EditCollegeForm } from "./edit-college-form";


interface EditCollegeFormWrapperProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const EditCollegeFormWrapper = ({
  id,
  isOpen,
  setIsOpen,
}: EditCollegeFormWrapperProps) => {
  const { data, isLoading } = useGetCollegeById(id);
  const initialValues = data?.college;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
        <EditCollegeForm
          initialValues={initialValues} // Pass initial values to the form
          onCancel={() => setIsOpen(false)} // Close the dialog on cancel
        />
  );
};
