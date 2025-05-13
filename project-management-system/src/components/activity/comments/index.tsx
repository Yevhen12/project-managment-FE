import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../ActivitySection.module.scss";
import { CommentType } from "../../../shared/types/task";
import {
  useAddCommentMutation,
  useGetTaskByIdQuery,
} from "../../../api/taskApi";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

interface CommentsProps {
  comments: CommentType[];
}

export const Comments = ({ comments }: CommentsProps) => {
  const { taskId } = useParams<{ taskId: string }>();
  const [newComment, setNewComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const currentUser = useAppSelector((state) => state.auth.user);

  const { refetch } = useGetTaskByIdQuery(taskId!, {
    skip: !taskId,
  });

  const handleAddComment = async () => {
    if (!newComment.trim() || !taskId) return;

    try {
      await addComment({ taskId, text: newComment }).unwrap();
      setNewComment("");
      await refetch();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div className={styles.comments}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <strong>
              {comment.author?.firstName} {comment.author?.lastName}
            </strong>
            : {comment.content}
            <div className={styles.timestamp}>
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
