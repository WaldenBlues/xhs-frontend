// ChatWidget.jsx
import { useState } from "react";
import axios from "axios";

// ✅ 设定“小红书客服”系统 prompt
const systemPrompt = {
  role: "system",
  content:
    "你是一位小红书平台的智能客服助手，小红书昵称“小红客服”。你的语气友好、活泼，喜欢使用口语和 emoji（比如：✨、😊、📌），擅长帮助用户解决社区内容发布、账号登录、评论互动等问题。请用简洁易懂的话回复用户。",
};

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [systemPrompt, ...updatedMessages],
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
      console.error("❌ DeepSeek API 错误:", err);
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
          backgroundColor: "#e60023",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        💬 小红客服
      </button>

      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 320,
            height: 420,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            zIndex: 10000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong>
                  {msg.role === "user" ? "你" : "小红客服"}:
                </strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              placeholder="有问题找小红客服 ✨"
            />
          </div>
        </div>
      )}
    </div>
  );
}
