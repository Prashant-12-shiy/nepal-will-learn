"use client";

import { PageLoader } from "@/components/page-loader";
// import PDFViewer from '@/components/PDFViewer';
import ViewerPDF from "@/components/viewPdf";
import { useGetNote } from "@/features/admin/note/api/use-get-note";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const NotePage = () => {
  const params = useParams();
  const id = params.id;
  const pathname = usePathname();
  const subjectUrl = pathname.split("/note")[0];

  const { data, isLoading } = useGetNote(id as string);
  const note = data?.note;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        whileHover={{ x: -5 }}
        className=" md:ml-10 lg:ml-16  inline-block"
      >
        <Link
          href={subjectUrl}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Subject
        </Link>
      </motion.div>
      <div className="max-w-screen-xl mx-auto">
        {/* Note Details */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
          <p className="text-gray-600 mt-2">{note.description}</p>
        </div>

        <ViewerPDF pdfUrl={note.content} />
      </div>
    </div>
  );
};

export default NotePage;
