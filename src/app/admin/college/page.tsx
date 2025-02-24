import { Separator } from "@/components/ui/separator";
import CollegeData from "@/features/admin/college/components/college-data-view";
import { CreateCollegeForm } from "@/features/admin/college/components/create-college-form";
import React from "react";

const AdminCollege = () => {
  return (
    <div>
      <div className="flex items-center justify-between mx-20 my-6">
        <h2 className="text-lg md:text-4xl font-semibold">College Section</h2>
        <CreateCollegeForm />
      </div>
      <Separator />
      <CollegeData />
    </div>
  );
};

export default AdminCollege;
