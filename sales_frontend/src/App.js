import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [summary, setSummary] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/comments?transcript_id=123"
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript_id: "123",
          user_id: "1",
          content: newComment,
          timestamp: Date.now(),
        }),
      });
      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sales Transcript Analysis</h1>
      </header>
      <main>
        <div className="transcript-section">
          <h2>Transcript</h2>
          {/* Transcript content will go here */}
        </div>

        <div className="comments-section">
          <h2>Comments</h2>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.comment_id} className="comment">
                <p>{comment.content}</p>
                <small>{new Date(comment.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
