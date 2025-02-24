export interface CollegeData {
    _id?: string;
    name: string;
    location: string;
    establishedYear: number;
    courses: string[];
    facilities: string[];
    email?: string;
    phone?: string;
    website?: string;
    accreditation?: string;
    affiliation: string;
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