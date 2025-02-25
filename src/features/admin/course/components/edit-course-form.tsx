"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { UniversityData } from "@/features/admin/university/types";

import {
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import { courseFormSchema } from "./create-course-form";
import { useUdpateCourse } from "../api/use-update-course";
import { CourseData } from "../types";




interface EditCourseFormProps {
  universities: UniversityData[];
  initialValues: CourseData;
  onCancel: () => void;
}

export const EditCourseForm = ({
  universities,
  initialValues,
  onCancel,
}: EditCourseFormProps) => {
  const collegeId = initialValues?._id ?? " ";
  
  // Initialize the form
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      ...initialValues,
      affiliation: initialValues?.affiliation?._id ?? "", 
    },
  });

  const { mutate, isPending } = useUdpateCourse();


  // Handle form submission
  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    const selectedUniversity = universities.find(
      (university) => university._id === values.affiliation
    );

    if (!selectedUniversity) {
      console.error("Selected university not found");
      return;
    }

    const updatedValues: CourseData = {
      ...values,
      affiliation: selectedUniversity, // Transform back to UniversityData
    };
  
    mutate(
      { data: updatedValues, id: collegeId },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  };

  return (
    <div>
      <DialogHeader className="pb-5">
        <DialogTitle>Edit Course</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 *:text-[10px] md:text-base"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Update course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Description */}
           <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter college description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
          {/* ShortName */}
          <FormField
            control={form.control}
            name="shortName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Short Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course shortName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter duration "
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* semester */}
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Total Semester</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter semester "
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fees */}
        <FormField
          control={form.control}
          name="fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter fees"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prerequisites"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prerequisites</FormLabel>
              <FormControl>
                {/* Here we're using a simple Input to accept comma-separated values */}
                <Input
                  placeholder="Enter prerequisites separated by commas"
                  value={
                    Array.isArray(field.value)
                      ? field.value.join(", ")
                      : field.value
                  }
                  onChange={(e) => {
                    // Split the input by commas and trim whitespace
                    const values = e.target.value
                      .split(",")
                      .map((val) => val.trim())
                      .filter((val) => val !== "");
                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="affiliation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliation</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? universities.find(
                            (university) => university._id === field.value
                          )?.name
                        : "Select University"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Seach University..." />
                    <CommandList>
                      <CommandEmpty>No university found.</CommandEmpty>
                      <CommandGroup>
                        {universities?.map((university) => (
                          <CommandItem
                            value={university._id}
                            key={university._id}
                            onSelect={() =>
                              form.setValue("affiliation", university._id ?? "")
                            }
                          >
                            {university.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                university._id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
                <FormMessage />
              </Popover>
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
    </div>
  );
};
