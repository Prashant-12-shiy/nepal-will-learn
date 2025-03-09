"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FileText, X } from "lucide-react";
import { useCreateNote } from "../api/use-create-note";

// Define the form schema using zod
export const noteFormSchema = z.object({
  title: z.string().min(1, "Name is required"),
  content: z.array(z.instanceof(File)),
  chapter: z.number().min(1, "Chapter is required"),
  description: z.string().optional(),
  // subjectId: z.string(),
});

interface CreateNoteFormProps {
  onCancel: () => void;
  subjectId: string;
  subjectSlug: string;
}

export const CreateNoteForm = ({
  onCancel,
  subjectId,
  subjectSlug,
}: CreateNoteFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      content: [],
      chapter: 1,  // Set a default number value
      description: "",
      // subjectId: subjectId,
    },
  });

  const { mutate, isPending, reset } = useCreateNote(subjectSlug);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof noteFormSchema>) => {
    console.log("Submitting form with values:", values); // Debugging

    mutate(
      {
        ...values,
        subjectId,
        content: values.content ? [values.content[0]] : [],
      },
      {
        onSuccess: () => {
          reset();
          setSelectedFile(null);
          onCancel();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form   onSubmit={(e) => {
    e.preventDefault();
    console.log("Form submission event triggered");
    form.handleSubmit(onSubmit)(e);
  }} className="space-y-8 ">
        <div className="flex items-center *:w-full gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter note title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chapter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Chapter</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter chapter "
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter note description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Note PDF</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* File Input */}
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      field.onChange(files);
                      setSelectedFile(files[0] || null); // Set the selected file for preview
                    }}
                    className="hidden" // Hide the default file input
                    id="pdf-upload"
                  />
                  {/* Custom Upload Button */}
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose PDF
                  </label>
                  {/* Preview Section */}
                  {selectedFile && (
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                      {/* PDF Icon */}
                      <FileText className="h-8 w-8 text-red-500" />
                      {/* File Name and Size */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      {/* Remove Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          field.onChange([]); // Clear the field value
                          setSelectedFile(null); // Clear the preview
                        }}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between *:w-full gap-7">
          <Button disabled={isPending} type="submit" variant="secondary">
            Submit
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
