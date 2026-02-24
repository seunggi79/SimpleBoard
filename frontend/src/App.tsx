import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { createPost, fetchPosts, removePost, updatePost } from './api/posts'
import type { Post } from './types/post'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const loadPosts = useCallback(async () => {
    try {
      setError(null)
      const list = await fetchPosts()
      setPosts(list)
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const onCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    try {
      setSubmitting(true)
      await createPost({ title: title.trim(), content: content.trim() })
      setTitle('')
      setContent('')
      await loadPosts()
    } catch (e) {
      setError(e instanceof Error ? e.message : '글 작성 실패')
    } finally {
      setSubmitting(false)
    }
  }

  const startEdit = (post: Post) => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  const onSaveEdit = async (id: number) => {
    if (!editTitle.trim() || !editContent.trim()) return

    try {
      setSubmitting(true)
      await updatePost(id, { title: editTitle.trim(), content: editContent.trim() })
      cancelEdit()
      await loadPosts()
    } catch (e) {
      setError(e instanceof Error ? e.message : '글 수정 실패')
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: number) => {
    if (!window.confirm('이 글을 삭제할까요?')) return

    try {
      setSubmitting(true)
      await removePost(id)
      await loadPosts()
    } catch (e) {
      setError(e instanceof Error ? e.message : '글 삭제 실패')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="board">
      <header className="board-header">
        <h1>게시판</h1>
        <button className="ghost-btn" onClick={loadPosts} disabled={submitting}>
          새로고침
        </button>
      </header>

      <section className="panel">
        <h2>글 작성</h2>
        <form className="form" onSubmit={onCreate}>
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <button type="submit" disabled={submitting}>
            작성
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>글 목록</h2>
        {loading && <p>불러오는 중...</p>}
        {error && <p className="error">오류: {error}</p>}
        {!loading && posts.length === 0 && <p>등록된 글이 없습니다.</p>}

        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              {editingId === post.id ? (
                <div className="edit-box">
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <textarea
                    rows={4}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="actions">
                    <button onClick={() => onSaveEdit(post.id)} disabled={submitting}>
                      저장
                    </button>
                    <button className="ghost-btn" onClick={cancelEdit} disabled={submitting}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <article>
                  <div className="post-top">
                    <h3>
                      #{post.id} {post.title}
                    </h3>
                    <div className="actions">
                      <button className="ghost-btn" onClick={() => startEdit(post)} disabled={submitting}>
                        수정
                      </button>
                      <button className="danger-btn" onClick={() => onDelete(post.id)} disabled={submitting}>
                        삭제
                      </button>
                    </div>
                  </div>
                  <p>{post.content}</p>
                </article>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
