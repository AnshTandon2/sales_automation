import React, { useCallback } from "react";

interface HighlightableTextProps {
  content: string;
  onTextSelect: (selection: {
    text: string;
    startOffset: number;
    endOffset: number;
  }) => void;
}

const HighlightableText = ({
  content,
  onTextSelect,
}: HighlightableTextProps) => {
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const text = selection.toString();

    onTextSelect({
      text,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    });
  }, [onTextSelect]);

  return (
    <div className="highlightable-text" onMouseUp={handleMouseUp}>
      {content}
    </div>
  );
};

export default HighlightableText;
