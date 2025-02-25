import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Layers } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // For animations
import { SubjectData } from "../../subject/types";
import { SemesterData } from "../types";

interface CourseSemesterCardProps {
  semesterData: SemesterData[];
}

const CourseSemesterCard = ({ semesterData }: CourseSemesterCardProps) => {
  return (
    <div className="space-y-6">
      {semesterData.map((semester) => (
        <motion.div
          key={semester._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-white">
                <Layers className="h-6 w-6" />
                <span>Semester {semester.semesterNumber}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white rounded-md">
              <div className="space-y-4">
                {semester.subjects.map((subject: SubjectData) => (
                  <motion.div
                    key={subject._id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={`/subjects/${subject._id}`}
                      className="block p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors"
                    >
                      <div className="block *:mt-2 md:*:mt-0 md:flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-gray-800">
                            {subject.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-sm">
                            {subject.code}
                          </Badge>
                          <Badge variant="outline" className="text-sm">
                            {subject.credits} Credits
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseSemesterCard;