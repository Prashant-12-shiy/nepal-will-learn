import { CourseData } from "../course/types";
import { SubjectData } from "../subject/types";

export interface SemesterData {
    _id?: string;
    course: CourseData;
    semesterNumber: number;
    subjects: SubjectData[];
}