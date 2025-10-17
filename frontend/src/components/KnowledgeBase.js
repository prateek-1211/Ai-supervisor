import { useEffect, useState } from "react";
import { getKnowledge } from "../api";

export default function KnowledgeBase() {
  const [kb, setKb] = useState({});

  useEffect(() => {
    getKnowledge().then((res) => setKb(res.data));
  }, []);

  return (
    <div className="kb">
      <h3>Learned Answers</h3>
      {Object.entries(kb).map(([q, a]) => (
        <div key={q} className="card">
          <p><b>Q:</b> {q}</p>
          <p><b>A:</b> {a}</p>
        </div>
      ))}
    </div>
  );
}
