import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const password = await bcrypt.hash("password123", 10); // ตั้งรหัสผ่าน
    const user = await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: password,
        },
    });

    console.log("Created user:", user.email);

    // const post = await prisma.post.create({
    //     data: {
    //         title: "Welcome to My Blog",
    //         slug: "welcome-to-my-blog",
    //         content: "This is my very first blog post! 🚀",
    //         published: true,
    //         authorId: user.id,
    //     },
    // });

    // console.log("Created post:", post.title);

    // const course = await prisma.course.create({
    //     data: {
    //         title: "Introduction to Programming",
    //         slug: "intro-to-programming",
    //         description: "Learn the basics of programming with this course!",
    //         published: true,
    //         authorId: user.id,
    //         lessons: {
    //             create: [
    //                 {
    //                     title: "Lesson 1: What is Programming?",
    //                     content:
    //                         "Programming is the process of creating software...",
    //                     order: 1,
    //                 },
    //                 {
    //                     title: "Lesson 2: Variables and Data Types",
    //                     content:
    //                         "Variables are containers for storing data values...",
    //                     order: 2,
    //                 },
    //             ],
    //         },
    //     },
    //     include: {
    //         lessons: true,
    //     },
    // });

    // console.log("Created course:", course.title);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
