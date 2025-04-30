import { Post, PostCreate, PostUpdate } from '../../schemas';

export interface IPostService {
    getAll(): Promise<Post[]>;
    getById(id: number): Promise<Post>;
    create(data: PostCreate): Promise<Post>;
    update(id: number, data: PostUpdate): Promise<Post>;
    delete(id: number): void;
}
