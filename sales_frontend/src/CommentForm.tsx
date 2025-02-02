import React, { useState } from "react";

interface CommentFormProps {
  transcriptId: string;
  selectedText: {
    text: string;
    startOffset: number;
    endOffset: number;
  } | null;
  onSubmit: (content: string) => void;
  onClose: () => void;
}

const CommentForm = ({ selectedText, onSubmit, onClose }: CommentFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your comment..."
      />
      <div className="form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
