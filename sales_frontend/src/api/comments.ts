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

export const fetchComments = async (
  transcriptId: string
): Promise<Comment[]> => {
  const response = await fetch(`/api/transcripts/${transcriptId}/comments`);
  return response.json();
};

export const createComment = async (
  transcriptId: string,
  comment: NewComment
): Promise<Comment> => {
  const response = await fetch(`/api/transcripts/${transcriptId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  return response.json();
};

export const removeComment = async (commentId: string): Promise<void> => {
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
};
