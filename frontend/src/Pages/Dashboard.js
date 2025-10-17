import { useState, useEffect } from "react";
import { askAI, getKnowledge } from "../api";

export default function Dashboard() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getKnowledge();
      setHistory(res.data ? Object.entries(res.data) : []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setResponse("Thinking...");
    try {
      const res = await askAI(question);
      setResponse(res.data.response);

      fetchHistory();

      setQuestion("");
    } catch (err) {
      console.error("Error asking AI:", err);
      setResponse("Error: Unable to get a response.");
    }
  };

  return (
    <div className="dashboard">
      <h3>Customer Query Simulation</h3>
      <div className="ask-box">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask AI a question..."
        />
        <button onClick={handleAsk}>Ask AI</button>
      </div>

      {response && <p className="response">{response}</p>}

      <h4>Previous Interactions</h4>
      <div className="history">
        {history.length === 0 ? (
          <p>No previous queries yet.</p>
        ) : (
          history.map(([q, a], idx) => (
            <div key={idx} className="card">
              <p><b>Q:</b> {q}</p>
              <p><b>A:</b> {a}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
