// ChatWidget.jsx
import { useState } from "react";
import axios from "axios";

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const reply = res.data.choices[0].message;
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error("DeepSeek API 错误:", err);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowChat((s) => !s)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: "#0d6efd",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
        }}
      >
        客服
      </button>

      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            zIndex: 10000,
          }}
        >
          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong>{msg.role === "user" ? "你" : "AI"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ width: "100%" }}
              placeholder="输入问题..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
