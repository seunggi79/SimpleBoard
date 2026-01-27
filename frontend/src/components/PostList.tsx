import type { Post } from "../types/post";

type Props = {
  posts: Post[];
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onRefresh: () => void;
};

export default function PostList({ posts, onSelect, onDelete, onRefresh }: Props) {
  return (
    <div style={{ width: 320 }}>
      <h2>목록</h2>
      <button onClick={onRefresh}>새로고침</button>

      <ul style={{ paddingLeft: 16 }}>
        {posts.map((p) => (
          <li key={p.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ cursor: "pointer" }} onClick={() => onSelect(p.id)}>
              #{p.id} {p.title}
            </span>
            <button onClick={() => onDelete(p.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}