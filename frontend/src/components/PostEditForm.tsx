type PostEditFormProps = {
  title: string
  content: string
  submitting: boolean
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
}

export function PostEditForm({
  title,
  content,
  submitting,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel,
}: PostEditFormProps) {
  return (
    <div className="edit-box">
      <input value={title} onChange={(e) => onTitleChange(e.target.value)} />
      <textarea rows={4} value={content} onChange={(e) => onContentChange(e.target.value)} />
      <div className="actions">
        <button onClick={onSave} disabled={submitting}>
          저장
        </button>
        <button className="ghost-btn" onClick={onCancel} disabled={submitting}>
          취소
        </button>
      </div>
    </div>
  )
}
