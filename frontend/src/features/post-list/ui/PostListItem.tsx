import { PostEditForm } from '../../post-edit/ui/PostEditForm'
import type { Post } from '../../../entities/post/model/types'

type PostListItemProps = {
  post: Post
  isEditing: boolean
  submitting: boolean
  editTitle: string
  editContent: string
  onEditTitleChange: (value: string) => void
  onEditContentChange: (value: string) => void
  onStartEdit: (post: Post) => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
  onDelete: (id: number) => void
}

export function PostListItem({
  post,
  isEditing,
  submitting,
  editTitle,
  editContent,
  onEditTitleChange,
  onEditContentChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: PostListItemProps) {
  return (
    <li className="post-item">
      {isEditing ? (
        <PostEditForm
          title={editTitle}
          content={editContent}
          submitting={submitting}
          onTitleChange={onEditTitleChange}
          onContentChange={onEditContentChange}
          onSave={() => onSaveEdit(post.id)}
          onCancel={onCancelEdit}
        />
      ) : (
        <article>
          <div className="post-top">
            <h3>
              #{post.id} {post.title}
            </h3>
            <div className="actions">
              <button className="ghost-btn" onClick={() => onStartEdit(post)} disabled={submitting}>
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
  )
}
