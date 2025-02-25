import { UniversityData } from "../university/types";

export interface CourseData {
    _id?: string
    name: string;
    slug?: string;
    shortName: string;
    description: string;
    duration: number;
    semester: number;
    fees?: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced',
    prerequisites?: string[];
    affiliation: UniversityData;
}