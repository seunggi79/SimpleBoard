import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState<Post | null>(null);

  // 선택된 글 상세 보기
  const loadDetail = async (id: number) => {
    const res = await fetch(`/posts/${id}`);
    const data: Post = await res.json();
    setSelected(data);
  };

  // 목록 불러오기: GET /posts
  const loadPosts = async () => {
    const res = await fetch("/posts");
    const data: Post[] = await res.json();
    setPosts(data);
  };

  // 글 생성: POST /posts (백엔드가 @RequestParam 방식일 때)
  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목/내용 입력해라");
      return;
    }

    const body = new URLSearchParams();
    body.append("title", title);
    body.append("content", content);

    await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Simple Board (React + Spring 연결)</h1>

      <h2>글쓰기</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={4}
        />
        <button onClick={createPost}>저장</button>
      </div>

      <hr />

      <h2>목록</h2>
      <button onClick={loadPosts}>새로고침</button>
      <ul>
        {posts.map((p) => (
          <li
            key={p.id}
            style={{ cursor: "pointer" }}
            onClick={() => loadDetail(p.id)}
          >
            #{p.id} {p.title}
          </li>
        ))}
      </ul>

      {selected ? (
        <div>
          <h3>상세</h3>
          <div>id: {selected.id}</div>
          <div>title: {selected.title}</div>
          <div>content: {selected.content}</div>
        </div>
      ) : (
        <div>글을 클릭하면 상세가 보임</div>
      )}

    </div>
  );
}
