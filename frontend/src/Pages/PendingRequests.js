import { useEffect, useState } from "react";
import { getRequests, resolveRequest, deleteRequest } from "../api";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await getRequests();
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleResolve = async (req) => {
    const answer = answers[req.id];
    if (!answer || !answer.trim()) {
      alert("Please enter an answer before submitting!");
      return;
    }

    await resolveRequest(req.id, req.question, answer);
    fetchRequests();

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[req.id];
      return updated;
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      await deleteRequest(id);
      fetchRequests(); 
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  return (
    <div className="requests">
      <h3>Supervisor Help Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="card">
            <p><strong>Question:</strong> {req.question}</p>
            <p>Status: {req.status}</p>

            {req.status === "pending" && (
              <>
                <input
                  placeholder="Enter your answer..."
                  value={answers[req.id] || ""}
                  onChange={(e) => handleAnswerChange(req.id, e.target.value)}
                />
                <button onClick={() => handleResolve(req)}>Submit</button>
              </>
            )}

            <button
              onClick={() => handleDelete(req.id)}
              style={{
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
