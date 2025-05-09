import { ILessonService } from "../interfaces";
import { Lesson, LessonCreate, LessonUpdate } from "../schemas";
import prisma from "../config/prisma";
import ApiError from "../utils/apiError";

export default class LessonService implements ILessonService {
    async getAll(): Promise<Lesson[]> {
        const lessons = await prisma.lesson.findMany();
        return lessons;
    }

    async getById(id: number): Promise<Lesson> {
        const lesson = await prisma.lesson.findUnique({
            where: { id },
        });
        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }
        return lesson as Lesson;
    }

    async getByCourseId(id: number): Promise<Lesson[]> {
        const lessons = await prisma.lesson.findMany({
            where: { courseId: id },
        });
        return lessons;
    }

    async create(data: LessonCreate): Promise<Lesson> {
        const lesson = await prisma.lesson.create({
            data,
        });
        return lesson as Lesson;
    }

    async update(id: number, data: LessonUpdate): Promise<Lesson> {
        const lessonExists = await prisma.lesson.findUnique({
            where: { id },
        });
        if (!lessonExists) {
            throw new ApiError(404, "Lesson not found");
        }
        const lesson = await prisma.lesson.update({
            where: { id },
            data,
        });
        return lesson as Lesson;
    }

    async delete(id: number): Promise<void> {
        const lessonExists = await prisma.lesson.findUnique({
            where: { id },
        });
        if (!lessonExists) {
            throw new ApiError(404, "Lesson not found");
        }
        await prisma.lesson.delete({
            where: { id },
        });
    }
}
