import { useEffect, useState } from "react";
import styles from "../ActivitySection.module.scss";
import { CommentType } from "../../../shared/types/task";

export const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComments([
        { id: 1, author: "Yevhen", text: "Looks good!", createdAt: new Date() },
        { id: 2, author: "Oleh", text: "Need help with this.", createdAt: new Date() },
      ]);
      setLoading(false);
    }, 1000); // імітація завантаження 1 секунда
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Current User",
        text: newComment,
        createdAt: new Date(),
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
    }
  };

  if (loading) {
    return <div className={styles.loader}>Loading comments...</div>;
  }

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
            <strong>{comment.author}</strong>: {comment.text}
            <div className={styles.timestamp}>{comment.createdAt.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
