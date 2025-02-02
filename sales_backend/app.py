from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
comments_table = dynamodb.Table('sales_comments')

@app.route('/')
def home():
    return "Welcome to the Sales Transcript API!"

@app.route('/api/comments', methods=['GET'])
def get_comments():
    transcript_id = request.args.get('transcript_id')
    response = comments_table.query(
        KeyConditionExpression='transcript_id = :tid',
        ExpressionAttributeValues={':tid': transcript_id}
    )
    return jsonify(response.get('Items', []))

@app.route('/api/comments', methods=['POST'])
def create_comment():
    data = request.json
    comment_item = {
        'comment_id': str(datetime.utcnow().timestamp()),
        'transcript_id': data['transcript_id'],
        'user_id': data['user_id'],
        'content': data['content'],
        'timestamp': data['timestamp'],
        'created_at': datetime.utcnow().isoformat()
    }
    comments_table.put_item(Item=comment_item)
    return jsonify(comment_item), 201

@app.route('/api/summary', methods=['POST'])
def generate_summary():
    data = request.json
    # TODO: Implement LLM integration for summary generation
    summary = "Summary placeholder - LLM integration pending"
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)