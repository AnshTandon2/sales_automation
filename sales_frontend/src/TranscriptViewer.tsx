import React, { useState, useEffect } from "react";
import HighlightableText from "./HighlightableText";
import CommentSidebar from "./CommentSidebar";
import "../styles/transcript.css";

interface TranscriptViewerProps {
  transcriptId: string;
  content: string;
}

export const TranscriptViewer = ({
  transcriptId,
  content,
}: TranscriptViewerProps) => {
  const [selectedText, setSelectedText] = useState(
    null as {
      text: string;
      startOffset: number;
      endOffset: number;
    } | null
  );

  const handleTextSelection = (selection: {
    text: string;
    startOffset: number;
    endOffset: number;
  }) => {
    setSelectedText(selection);
  };

  return (
    <div className="transcript-container">
      <div className="transcript-content">
        <HighlightableText
          content={content}
          onTextSelect={handleTextSelection}
        />
      </div>
      <CommentSidebar transcriptId={transcriptId} selectedText={selectedText} />
    </div>
  );
};

export default TranscriptViewer;
