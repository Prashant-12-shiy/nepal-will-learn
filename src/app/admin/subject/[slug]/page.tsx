"use client";

import { PageLoader } from "@/components/page-loader";
import { useGetSubject } from "@/features/admin/subject/api/use-get-subject-slug";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseData } from "@/features/admin/course/types";
import { NoteData } from "@/features/admin/note/types";
import { ResponsiveModel } from "@/components/responsive-model";
import { CreateNoteFormWrapper } from "@/features/admin/note/components/create-note-form-wrapper";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "lucide-react";

const SubjectPage = ({ params }: { params: { slug: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetSubject(params.slug);
  const subjectData = data?.subject;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!subjectData) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Subject Header */}
        <Card className="shadow-lg bg-red-200 border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {subjectData.name}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {subjectData.description}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-sm bg-blue-100 text-blue-800"
              >
                {subjectData.code}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 ">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Credits: {subjectData.credits}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-gray-600">
                  {subjectData.isGeneral
                    ? "General Subject"
                    : "Specialized Subject"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Last Updated:{" "}
                {new Date(subjectData.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Courses</h2>
          <div className="space-y-4">
            {subjectData.courses.map((course: CourseData) => (
              <Card
                key={course._id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {course.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes</h2>
            <Button onClick={() => setIsOpen(true)}>Add New Note</Button>
          </div>
          {subjectData.notes.length > 0 ? (
            <div className=" grid md:grid-cols-2 gap-4  ">
              {subjectData.notes.map((note: NoteData) => (
                <Card
                  key={note._id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-800">
                        {note.title}
                      </CardTitle>

                      <div className="flex items-center gap-3 *:size-4 *:cursor-pointer">
                        <PencilIcon className="hover:text-green-600" />
                        <TrashIcon className="hover:text-red-600" />
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {note.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/admin/subject/${subjectData.slug}/note/${note._id}`}
                    >
                      <Button>View Note</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">
              No notes available for this subject.
            </div>
          )}
        </div>
      </div>

      <ResponsiveModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="max-w-[75vw]"
      >
        <CreateNoteFormWrapper
          setIsOpen={setIsOpen}
          subjectId={subjectData._id}
          subjectSlug={subjectData.slug}
        />
      </ResponsiveModel>
    </div>
  );
};

export default SubjectPage;
