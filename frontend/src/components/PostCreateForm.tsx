import type { FormEvent } from 'react'

type PostCreateFormProps = {
  title: string
  content: string
  submitting: boolean
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function PostCreateForm({
  title,
  content,
  submitting,
  onTitleChange,
  onContentChange,
  onSubmit,
}: PostCreateFormProps) {
  return (
    <section className="panel">
      <h2>글 작성</h2>
      <form className="form" onSubmit={onSubmit}>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          maxLength={100}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={4}
        />
        <button type="submit" disabled={submitting}>
          작성
        </button>
      </form>
    </section>
  )
}
