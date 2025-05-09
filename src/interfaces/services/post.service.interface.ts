import { Post, PostCreate, PostUpdate, PostQuery } from "../../schemas";

export interface IPostService {
    getAll(query: PostQuery): Promise<Post[]>;
    getById(id: number): Promise<Post>;
    getBySlug(slug: string): Promise<Post>;
    create(data: PostCreate): Promise<Post>;
    update(id: number, data: PostUpdate): Promise<Post>;
    delete(id: number): void;
}
