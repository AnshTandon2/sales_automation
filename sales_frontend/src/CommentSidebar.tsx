import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { useComments } from "./useComments";

interface CommentSidebarProps {
  transcriptId: string;
  selectedText: {
    text: string;
    startOffset: number;
    endOffset: number;
  } | null;
}

const CommentSidebar = ({
  transcriptId,
  selectedText,
}: CommentSidebarProps) => {
  const { comments, addComment, deleteComment } = useComments(transcriptId);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="comment-sidebar">
      <div className="comment-header">
        <h2>Comments</h2>
        {selectedText && (
          <button onClick={() => setIsFormOpen(true)}>Add Comment</button>
        )}
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p className="highlighted-text">{comment.highlightedText}</p>
            <p className="comment-content">{comment.content}</p>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <CommentForm
          transcriptId={transcriptId}
          selectedText={selectedText}
          onSubmit={(content) => {
            addComment({
              content,
              highlightedText: selectedText?.text || "",
              startOffset: selectedText?.startOffset || 0,
              endOffset: selectedText?.endOffset || 0,
            });
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default CommentSidebar;
