import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { createPost, fetchPosts, removePost, updatePost } from '../api/posts'
import type { Post } from '../types/post'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

export function usePostsBoard() {
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
      setError(getErrorMessage(e, '알 수 없는 오류'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadPosts()
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
      setError(getErrorMessage(e, '글 작성 실패'))
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
      setError(getErrorMessage(e, '글 수정 실패'))
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
      setError(getErrorMessage(e, '글 삭제 실패'))
    } finally {
      setSubmitting(false)
    }
  }

  return {
    posts,
    loading,
    error,
    title,
    content,
    submitting,
    editingId,
    editTitle,
    editContent,
    setTitle,
    setContent,
    setEditTitle,
    setEditContent,
    loadPosts,
    onCreate,
    startEdit,
    cancelEdit,
    onSaveEdit,
    onDelete,
  }
}
