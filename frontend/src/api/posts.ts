import type { Post, PostWritePayload } from '../types/post'

async function parseError(res: Response) {
  const text = await res.text()
  if (!text) return `HTTP ${res.status}`
  return `${res.status} ${text}`
}

export async function fetchPosts() {
  const res = await fetch('/posts')
  if (!res.ok) throw new Error(await parseError(res))

  const data = (await res.json()) as Post[]
  return data.sort((a, b) => b.id - a.id)
}

export async function createPost(payload: PostWritePayload) {
  const res = await fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as Post
}

export async function updatePost(id: number, payload: PostWritePayload) {
  const res = await fetch(`/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as Post
}

export async function removePost(id: number) {
  const res = await fetch(`/posts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await parseError(res))
}
