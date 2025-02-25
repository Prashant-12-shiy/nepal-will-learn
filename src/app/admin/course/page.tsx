"use client";
import { ResponsiveModel } from "@/components/responsive-model";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CourseData from "@/features/admin/course/components/course-data-view";
import { CreateCourseFormWrapper } from "@/features/admin/course/components/create-course-form-wrapper";
import React, { useState } from "react";

const AdminCourse = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mx-20 my-6">
        <h2 className="text-lg md:text-4xl font-semibold">Course Section</h2>
        <Button onClick={() => setIsOpen(true)}>Create Course</Button>
      </div>
      <Separator />
      <CourseData />

      <ResponsiveModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="max-w-[75vw]"
      >
        <CreateCourseFormWrapper setIsOpen={setIsOpen} />
      </ResponsiveModel>
    </div>
  );
};

export default AdminCourse;
