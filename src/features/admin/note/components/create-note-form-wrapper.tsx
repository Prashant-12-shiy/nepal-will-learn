"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateNoteForm } from "./create-note-form";

interface CreateNoteFormWrapperProps {
  setIsOpen: (open: boolean) => void;
  subjectId: string;
  subjectSlug: string;
}

export const CreateNoteFormWrapper = ({
  setIsOpen,
  subjectId,
  subjectSlug,
}: CreateNoteFormWrapperProps) => {


  return (
    <div>
      <DialogHeader className="mb-5">
        <DialogTitle>Create Note</DialogTitle>
        <DialogDescription>
          Fill out the form to create a new note.
        </DialogDescription>
      </DialogHeader>
      <CreateNoteForm
        subjectId={subjectId}
        subjectSlug={subjectSlug}
        onCancel={() => setIsOpen(false)} // Close the dialog on cancel
      />
    </div>
  );
};
