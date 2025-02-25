"use client";
import { PageLoader } from "@/components/page-loader";
import { useGetCourseBySlug } from "@/features/admin/course/api/use-get-course-slug";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // For card layout
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Clock,
  DollarSign,
  GraduationCap,
  Layers,
} from "lucide-react";
import Link from "next/link";
import CourseSemesterCard from "@/features/admin/semester/components/semester-course-card";

const CoursePage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const { data, isLoading } = useGetCourseBySlug(slug);
  const course = data?.course;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDD0] to-blue-300 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4"
      >
        <motion.div
          whileHover={{ x: -5 }}
          className=" md:ml-10 lg:ml-16  inline-block"
        >
          <Link
            href="/admin/course"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Course
          </Link>
        </motion.div>

        <Card className="md:max-w-[80vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <CardTitle className="text-3xl font-bold text-white">
              {course.name}
            </CardTitle>
            <CardDescription className="text-lg text-purple-200">
              {course.shortName}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Course Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                <BookOpen className="mr-2 h-6 w-6" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    Duration
                  </h3>
                  <p className="text-gray-700">{course.duration} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <Layers className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">
                    Semesters
                  </h3>
                  <p className="text-gray-700">{course.semester}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Fees</h3>
                  <p className="text-gray-700">${course.fees}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                <Award className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">
                    Level
                  </h3>
                  <p className="text-gray-700">{course.level}</p>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                <GraduationCap className="mr-2 h-6 w-6" />
                Prerequisites
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map(
                  (prerequisite: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      {prerequisite}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Affiliation (University) */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
                <GraduationCap className="mr-2 h-6 w-6" />
                Affiliation
              </h2>
              <p className="text-gray-700">{course.affiliation.name}</p>
            </div>

            {/* Semester Section */}
            <CourseSemesterCard semesterData={course.semestersDetails}/>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CoursePage;
