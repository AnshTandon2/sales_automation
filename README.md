# Sales Transcript Automation


This project allows sales managers to add, edit, and delete comments on specific parts of a sales transcript, with the ability to attach files to each comment. Additionally, implement a summary feature using LLMs to generate a concise overview of the entire transcript and its associated comments. This is very similar to Otter.ai’s product.

**Why the Founders Will Be Happy:** This feature directly supports Rilla's goal of providing actionable, data-driven feedback by enabling detailed annotation and summarization of sales interactions, improving coaching and decision-making.

**Tech Stack:** TypeScript, React, Node.js, AWS (S3 for file storage, DynamoDB for comment storage, Lambda for backend logic, SageMaker or GPT API for LLM integration)

**Starting Architecture:**

1. **Frontend:** React with TypeScript to create an intuitive interface for viewing transcripts, managing comments, and displaying summaries.
2. **Backend:** Node.js with AWS Lambda for handling CRUD operations for comments and file attachments, and integrating with an LLM to generate summaries.
3. **Database:** DynamoDB for storing comments and metadata, S3 for storing attached files, and integration with an LLM for summarizing the transcript.
