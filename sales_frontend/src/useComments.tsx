import { useState, useEffect } from "react";
import { fetchComments, createComment, removeComment } from "./api/comments";

interface Comment {
  id: string;
  content: string;
  highlightedText: string;
  startOffset: number;
  endOffset: number;
}

interface NewComment {
  content: string;
  highlightedText: string;
  startOffset: number;
  endOffset: number;
}

export const useComments = (transcriptId: string) => {
  const [comments, setComments] = useState([] as Comment[]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments(transcriptId);
      setComments(data);
    };
    loadComments();
  }, [transcriptId]);

  const addComment = async (newComment: NewComment) => {
    const comment = await createComment(transcriptId, newComment);
    setComments((prev) => [...prev, comment]);
  };

  const deleteComment = async (commentId: string) => {
    await removeComment(commentId);
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return {
    comments,
    addComment,
    deleteComment,
  };
};
