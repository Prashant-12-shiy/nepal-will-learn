export interface CreateUniversityData {
    _id?: string;
    name: string;
    slug?: string;
    location: string;
    establishedYear: number;
    description: string;
    logo?: File[]; // Optional
    images?: File[]; // Optional
    email?: string; // Optional
    phone?: string; // Optional
    website?: string; // Optional
    accreditation?: string; // Optional
    courses?: string[];
    facilities?: string[];
    facebook?: string; // Optional
    twitter?: string; // Optional
    linkedin?: string; // Optional
    instagram?: string; // Optional
    totalStudents?: number; // Optional
    totalFaculty?: number; // Optional
    campusArea?: number; // Optional
    libraries?: number; // Optional
    labs?: number; // Optional
    hostels?: number;
    colleges?: object[];
  }
  

  export interface UniversityData {
    _id?: string;
    name: string;
    slug?: string;
    location: string;
    establishedYear: number;
    description: string;
    logo?: string; // Optional
    images?: string; // Optional
    email?: string; // Optional
    phone?: string; // Optional
    website?: string; // Optional
    accreditation?: string; // Optional
    courses?: string[];
    facilities?: string[];
    facebook?: string; // Optional
    twitter?: string; // Optional
    linkedin?: string; // Optional
    instagram?: string; // Optional
    totalStudents?: number; // Optional
    totalFaculty?: number; // Optional
    campusArea?: number; // Optional
    libraries?: number; // Optional
    labs?: number; // Optional
    hostels?: number;
    colleges?: object[];
  }
  