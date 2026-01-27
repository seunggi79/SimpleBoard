import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import * as postApi from "../api/posts";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);

  const refresh = async () => {
    const data = await postApi.listPosts();
    setPosts(data);
  };

  const select = async (id: number) => {
    const data = await postApi.getPost(id);
    setSelected(data);
  };

  const create = async (title: string, content: string) => {
    await postApi.createPost({ title, content });
    await refresh();
  };

  const remove = async (id: number) => {
    await postApi.deletePost(id);
    setSelected(null);
    await refresh();
  };

  const update = async (id: number, title: string, content: string) => {
    const updated = await postApi.updatePost(id, { title, content });
    setSelected(updated);
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Simple Board</h1>

      <h2>글쓰기</h2>
      <PostForm onCreate={create} />

      <hr />

      <div style={{ display: "flex", gap: 24 }}>
        <PostList posts={posts} onSelect={select} onDelete={(id) => remove(id)} onRefresh={refresh} />
        <PostDetail post={selected} onUpdate={update} onDelete={remove} />
      </div>
    </div>
  );
}
