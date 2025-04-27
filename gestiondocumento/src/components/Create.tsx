import { useState } from "react";
import { createDocument } from "../services/post";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { title, content };
    createDocument(formData);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Create Document</h1>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2vh",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="title" style={{ width: "100px" }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: "5px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="content" style={{ width: "100px" }}>
            Content:
          </label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ flex: 1, padding: "5px" }}
          />
        </div>
        <button
          disabled={title === "" || content === ""}
          type="submit"
          style={{ width: "25%" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
