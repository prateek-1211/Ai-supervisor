from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
import uuid
from db import DBHandler  

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

db = DBHandler("help_requests.json")
KB_FILE = "knowledge_base.json"



def load_kb():
    try:
        with open(KB_FILE, "r") as f:
            return json.load(f)
    except:
        return {}


def save_kb(data):
    with open(KB_FILE, "w") as f:
        json.dump(data, f, indent=4)


@app.route("/api/ask", methods=["POST"])
def ask_ai():
    data = request.get_json()
    question = data.get("question")
    kb = load_kb()


    if question.lower() in kb:
        return jsonify({"response": kb[question.lower()], "status": "answered"})


    req_id = str(uuid.uuid4())
    new_req = {
        "id": req_id,
        "question": question,
        "status": "pending",
        "created_at": time.time()
    }
    db.add_request(new_req)

    print(f"Supervisor Alert: Need help with '{question}' [Request ID: {req_id}]")

    return jsonify({
        "response": "Let me check with my supervisor and get back to you.",
        "status": "pending"
    })


@app.route("/api/requests", methods=["GET"])
def get_requests():
    return jsonify(db.get_all())



@app.route("/api/resolve", methods=["POST"])
def resolve_request():
    data = request.get_json()
    req_id = data.get("id")
    answer = data.get("answer")

    db.update_request(req_id, "resolved", answer)

    kb = load_kb()
    kb[data.get("question").lower()] = answer
    save_kb(kb)

    print(f"AI Follow-up: Sent to customer → '{answer}'")
    return jsonify({"message": "Resolved & Knowledge Base Updated!"})


@app.route("/api/knowledge", methods=["GET"])
def get_kb():
    return jsonify(load_kb())



@app.route("/api/requests/<req_id>", methods=["DELETE"])
def delete_request(req_id):
    try:
        db.delete_request(req_id)
        print(f"Request Deleted: {req_id}")
        return jsonify({"message": "Request deleted successfully"}), 200
    except Exception as e:
        print(f"Error deleting request: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
