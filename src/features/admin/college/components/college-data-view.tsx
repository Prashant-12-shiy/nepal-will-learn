"use client";
import React from "react";
import { CollegeDataTable } from "./college-datatable";
import { columns } from "./columns";
import { useGetColleges } from "../api/use-get-colleges";
import { PageLoader } from "@/components/page-loader";

const CollegeData = () => {
  const { data, isLoading } = useGetColleges();

  if (isLoading) {
    return <PageLoader />;
  }

  return <CollegeDataTable columns={columns} data={data?.colleges ?? []} />;
};

export default CollegeData;
