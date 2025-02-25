"use client";

import { useGetUniversities } from "../../university/api/use-get-universities";
import { useGetCollegeBySlug } from "../api/use-get-college";
import { EditCollegeForm } from "./edit-college-form";


interface EditCollegeFormWrapperProps {
  slug: string;
  setIsOpen: (open: boolean) => void;
}

export const EditCollegeFormWrapper = ({
  slug,
  setIsOpen,
}: EditCollegeFormWrapperProps) => {
  const { data: collegeData, isLoading: isLoadingColleges } = useGetCollegeBySlug(slug);
  const {data: univeristiesData, isLoading: isLoadingUniveristies} = useGetUniversities(); 
  const initialValues = collegeData?.college;
  
  const univeristies = univeristiesData?.university;

  const isLoading = isLoadingColleges || isLoadingUniveristies;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
        <EditCollegeForm
         universities={univeristies} 
          initialValues={initialValues} // Pass initial values to the form
          onCancel={() => setIsOpen(false)} // Close the dialog on cancel
        />
  );
};
