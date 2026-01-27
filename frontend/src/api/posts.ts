import type { Post, PostCreateRequest, PostUpdateRequest } from "../types/post";

export async function listPosts(): Promise<Post[]> {
  const res = await fetch("/posts");
  if (!res.ok) throw new Error("listPosts failed");
  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`/posts/${id}`);
  if (!res.ok) throw new Error("getPost failed");
  return res.json();
}

export async function createPost(body: PostCreateRequest): Promise<Post> {
  const res = await fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("createPost failed");
  return res.json();
}

export async function updatePost(id: number, body: PostUpdateRequest): Promise<Post> {
  const res = await fetch(`/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("updatePost failed");
  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("deletePost failed");
}