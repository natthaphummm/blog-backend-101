import { ICourseService } from "../interfaces";
import { Course, CourseCreate, CourseUpdate, CourseQuery } from "../schemas";
import prisma from "../config/prisma";
import ApiError from "../utils/apiError";

export default class CourseService implements ICourseService {
    async getAll(query: CourseQuery): Promise<Course[]> {
        const courses = await prisma.course.findMany({
            where: query,
        });
        return courses;
    }

    async getById(id: number): Promise<Course> {
        const course = await prisma.course.findUnique({
            where: { id },
        });
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        return course as Course;
    }

    async getBySlug(slug: string): Promise<Course> {
        const course = await prisma.course.findUnique({
            where: { slug },
        });
        if (!course) {
            throw new ApiError(404, "Course not found");
        }
        return course as Course;
    }

    async create(data: CourseCreate): Promise<Course> {
        const course = await prisma.course.create({
            data,
        });
        return course as Course;
    }

    async update(id: number, data: CourseUpdate): Promise<Course> {
        const courseExists = await prisma.course.findUnique({
            where: { id },
        });
        if (!courseExists) {
            throw new ApiError(404, "Course not found");
        }
        const course = await prisma.course.update({
            where: { id },
            data,
        });
        return course as Course;
    }

    async delete(id: number): Promise<void> {
        const courseExists = await prisma.course.findUnique({
            where: { id },
        });
        if (!courseExists) {
            throw new ApiError(404, "Course not found");
        }
        await prisma.course.delete({
            where: { id },
        });
    }
}
