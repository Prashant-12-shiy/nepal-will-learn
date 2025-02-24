"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateUniversityForm } from "./create-university-form";

interface CreateUniversityFormWrapperProps {
  setIsOpen: (open: boolean) => void;
}

export const CreateUniversityFormWrapper = ({
  setIsOpen,
}: CreateUniversityFormWrapperProps) => {
  return (
    <div>
      <DialogHeader className="mb-5">
        <DialogTitle>Create University</DialogTitle>
        <DialogDescription>
          Fill out the form to create a new university.
        </DialogDescription>
      </DialogHeader>
      <CreateUniversityForm
        onCancel={() => setIsOpen(false)} // Close the dialog on cancel
      />
    </div>
  );
};
