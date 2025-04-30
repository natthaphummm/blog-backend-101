import { Course, CourseCreate, CourseUpdate } from '../../schemas';

export interface ICourseService {
    getAll(): Promise<Course[]>;
    getById(id: number): Promise<Course>;
    create(data: CourseCreate): Promise<Course>;
    update(id: number, data: CourseUpdate): Promise<Course>;
    delete(id: number): void;
}
