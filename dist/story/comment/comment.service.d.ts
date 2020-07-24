import { Repository } from 'typeorm';
import { Comment } from "../entity/comment.entity";
export declare class CommentService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    addComment(comment: Comment): Promise<Comment>;
}
