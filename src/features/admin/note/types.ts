export interface NoteData {
    _id?: string;
    title: string;
    subjectId?: string;
    content: File[];
    chapter: number;
    description?: string;
} 