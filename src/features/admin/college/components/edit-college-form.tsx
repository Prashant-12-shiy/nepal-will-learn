"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useCreateCollege } from "../api/use-create-college";
import { formSchema } from "./create-college-form";
import { PageLoader } from "@/components/page-loader";
import { CollegeData } from "../types";
import { useUdpateCollege } from "../api/use-update-college";

interface EditCollegeFormProps {
  initialValues: CollegeData;
  onCancel: () => void;
}

export const EditCollegeForm = ({
  initialValues,
  onCancel,
}: EditCollegeFormProps) => {
  const collegeId = initialValues._id ?? " ";

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { mutate, isPending, reset } = useUdpateCollege();

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({data: values, id: collegeId}, {
      onSuccess: () => {
        reset();
        onCancel();
      },
    });
  };

  return (
    <div>
      <DialogHeader className="pb-5">
        <DialogTitle>Edit College</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 *:text-[10px] md:text-base">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter college name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter college location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Established Year */}
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter established year"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Courses */}
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Courses</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter courses (comma-separated)"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Facilities */}
          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter facilities (comma-separated)"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5 *:w-full flex-col sm:flex-row">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5 *:w-full  flex-col sm:flex-row">
            {/* Accreditation */}
            <FormField
              control={form.control}
              name="accreditation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accreditation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter accreditation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Affiliation */}
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter affiliation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row  gap-5 *:w-full">
            {/* Total Students */}
            <FormField
              control={form.control}
              name="totalStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Students</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total students"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Faculty */}
            <FormField
              control={form.control}
              name="totalFaculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Faculty</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total faculty"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campus Area */}
            <FormField
              control={form.control}
              name="campusArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus Area (in sq. meters)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter campus area"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Libraries */}
          <FormField
            control={form.control}
            name="libraries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Libraries</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of libraries"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-5 *:w-full">
            {/* Labs */}
            <FormField
              control={form.control}
              name="labs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Labs</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of labs"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hostels */}
            <FormField
              control={form.control}
              name="hostels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Hostels</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of hostels"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 *:w-full">
            {/* Social Media Links */}
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Facebook URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Twitter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter LinkedIn URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Instagram URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter college description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-5 *:w-full">
            {/* Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter logo URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URLs (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URLs (comma-separated)"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
