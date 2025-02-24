"use client";
import React from "react";
import { UniversityDataTable } from "./university-datatable";
import { columns } from "./columns";
import { useGetUniversities } from "../api/use-get-universities";
import { PageLoader } from "@/components/page-loader";

const UniversityData = () => {
  const { data, isLoading } = useGetUniversities();

  if (isLoading) {
    return <PageLoader />;
  }

  return <UniversityDataTable columns={columns} data={data?.university ?? []} />;
};

export default UniversityData;
