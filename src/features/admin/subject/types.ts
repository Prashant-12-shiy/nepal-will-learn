import { CourseData } from "../course/types";

export interface SubjectData {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    code: string;
    credits: number;
    courses?: CourseData[];

}