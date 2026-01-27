import { useState } from "react";

type Props = {
  onCreate: (title: string, content: string) => Promise<void>;
};

export default function PostForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목/내용 입력해라");
      return;
    }
    await onCreate(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" rows={4} />
      <button onClick={submit}>저장</button>
    </div>
  );
}