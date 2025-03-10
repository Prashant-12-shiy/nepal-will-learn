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
import { useCreateUniversity } from "../api/use-create-university";

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/png",
//   "image/gif",
//   "image/jpg",
// ];

// Define the form schema using zod
export const universityFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  establishedYear: z
    .number()
    .min(1800, "Established year must be a valid year"),
  courses: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  accreditation: z.string().optional(),
  totalStudents: z
    .number()
    .min(0, "Total students must be a positive number")
    .optional(),
  totalFaculty: z
    .number()
    .min(0, "Total faculty must be a positive number")
    .optional(),
  campusArea: z
    .number()
    .min(0, "Campus area must be a positive number")
    .optional(),
  libraries: z
    .number()
    .min(0, "Number of libraries must be a positive number")
    .optional(),
  labs: z
    .number()
    .min(0, "Number of labs must be a positive number")
    .optional(),
  hostels: z.number().min(0, "Number of hostels must be a positive number"),
  facebook: z.string().url("Invalid URL").or(z.literal("")).optional(),
  twitter: z.string().url("Invalid URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Invalid URL").or(z.literal("")).optional(),
  instagram: z.string().url("Invalid URL").or(z.literal("")).optional(),
  description: z.string().min(1, "Description is required"),
  logo: z.array(z.instanceof(File)).optional(),
  images: z
  .array(z.instanceof(File))
  .max(10, { message: "You can upload a maximum of 5 images" }) // Array of files for images
  .optional(),
});

interface CreateUniversityFormProps {
  onCancel: () => void;
}

export const CreateUniversityForm = ({
  onCancel,
}: CreateUniversityFormProps) => {
  // Initialize the form
  const form = useForm<z.infer<typeof universityFormSchema>>({
    resolver: zodResolver(universityFormSchema),
    defaultValues: {
      name: "",
      location: "",
      establishedYear: 0,
      courses: [],
      facilities: [],
      email: "",
      phone: "",
      website: "",
      accreditation: "",
      totalStudents: 0,
      totalFaculty: 0,
      campusArea: 0,
      libraries: 0,
      labs: 0,
      hostels: 0,
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      description: "",
      logo: undefined,
      images: undefined,
    },
  });

  const { mutate, isPending, reset } = useCreateUniversity();

  // Handle form submission
  const onSubmit = (values: z.infer<typeof universityFormSchema>) => {
    mutate(
      {
        ...values,
        logo: values.logo ? [values.logo[0]] : [],
        images: values.images ? Array.from(values.images) : [],
      },
      {
        onSuccess: () => {
          reset();
          onCancel();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter university name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter university location" {...field} />
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

        <div className="flex gap-5 *:w-full">
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

        <div className="flex gap-5 *:w-full">
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

        <div className="flex gap-5 *:w-full">
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
        </div>

        <div className="flex gap-5 *:w-full">
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
                  placeholder="Enter university description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 *:w-full">
          {/* Logo */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? Array.from(e.target.files) : []) // Convert FileList to array
                    }
                  />
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
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      field.onChange(
                        e.target.files ? Array.from(e.target.files) : undefined
                      )
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
  );
};
