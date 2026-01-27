import { useEffect, useState } from "react";
import type { Post } from "../types/post";

type Props = {
  post: Post | null;
  onUpdate: (id: number, title: string, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function PostDetail({ post, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!post) return;
    setIsEditing(false);
    setEditTitle(post.title);
    setEditContent(post.content);
  }, [post]);

  if (!post) return <p>글을 클릭하면 상세가 보여</p>;

  const save = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목/내용 입력해라");
      return;
    }
    await onUpdate(post.id, editTitle, editContent);
    setIsEditing(false);
  };

  const remove = async () => {
    const ok = confirm("진짜 삭제할래?");
    if (!ok) return;
    await onDelete(post.id);
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>상세</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <b>#{post.id}</b>
        <button onClick={() => setIsEditing((v) => !v)}>{isEditing ? "수정 취소" : "수정"}</button>
        <button onClick={remove}>삭제</button>
      </div>

      {!isEditing ? (
        <>
          <p><b>제목:</b> {post.title}</p>
          <p><b>내용:</b></p>
          <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: 12 }}>
            {post.content}
          </div>
        </>
      ) : (
        <>
          <p><b>제목(수정):</b></p>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: 420 }} />

          <p><b>내용(수정):</b></p>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={6} style={{ width: 420 }} />

          <div style={{ marginTop: 8 }}>
            <button onClick={save}>수정 저장</button>
          </div>
        </>
      )}
    </div>
  );
}
