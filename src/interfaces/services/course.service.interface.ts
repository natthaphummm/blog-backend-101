import { Course, CourseCreate, CourseUpdate, CourseQuery } from "../../schemas";

export interface ICourseService {
    getAll(query: CourseQuery): Promise<Course[]>;
    getById(id: number): Promise<Course>;
    getBySlug(slug: string): Promise<Course>;
    create(data: CourseCreate): Promise<Course>;
    update(id: number, data: CourseUpdate): Promise<Course>;
    delete(id: number): void;
}
