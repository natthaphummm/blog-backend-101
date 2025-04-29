import { IPostService } from "../interfaces";
import { Post, PostCreate, PostUpdate } from "../schemas";
import prisma from "../config/prisma";
import ApiError from "../utils/apiError";

export default class PostService implements IPostService {
    async getAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts;
    }
    async getById(id: number): Promise<Post> {
        const post = await prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new ApiError(404, "Post not found");
        }
        return post as Post;
    }
    async create(data: PostCreate): Promise<Post> {
        const post = await prisma.post.create({
            data,
        });
        return post as Post;
    }
    async update(id: number, data: PostUpdate): Promise<Post> {
        const postExists = await prisma.post.findUnique({
            where: { id },
        });
        if (!postExists) {
            throw new ApiError(404, "Post not found");
        }

        const post = await prisma.post.update({
            where: { id },
            data,
        });
        return post as Post;
    }
    async delete(id: number): Promise<void> {
        const postExists = await prisma.post.findUnique({
            where: { id },
        });
        if (!postExists) {
            throw new ApiError(404, "Post not found");
        }

        await prisma.post.delete({
            where: { id },
        });
    }
}
