import { UniversityData } from "../university/types";

export interface CollegeData {
    _id?: string;
    name: string;
    slug?: string;
    location: string;
    establishedYear: number;
    courses: string[];
    facilities: string[];
    email?: string;
    phone?: string;
    website?: string;
    accreditation?: string;
    affiliation: UniversityData;
    totalStudents?: number;
    totalFaculty?: number;
    campusArea?: number;
    libraries?: number;
    labs?: number;
    hostels: number;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    description: string;
    logo?: string;
    images?: string[];
}