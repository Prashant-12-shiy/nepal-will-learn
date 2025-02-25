"use client";
import React from "react";
import { CourseDataTable } from "./course-datatable";
import { CourseColumns } from "./columns";
import { PageLoader } from "@/components/page-loader";
import { useGetCourses } from "../api/use-get-course";

const CourseData = () => {
  const { data, isLoading } = useGetCourses();
  
  if (isLoading) {
    return <PageLoader />;
  }

  return <CourseDataTable columns={CourseColumns} data={data?.course ?? []} />;
};

export default CourseData;
