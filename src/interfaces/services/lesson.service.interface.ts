import { Lesson, LessonCreate, LessonUpdate } from "../../schemas";

export interface ILessonService {
    getAll(): Promise<Lesson[]>;
    getById(id: number): Promise<Lesson>;
    getByCourseId(id: number): Promise<Lesson[]>;
    create(data: LessonCreate): Promise<Lesson>;
    update(id: number, data: LessonUpdate): Promise<Lesson>;
    delete(id: number): void;
}
