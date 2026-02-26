import { PostListItem } from './PostListItem'
import type { Post } from '../../../entities/post/model/types'

type PostListSectionProps = {
  posts: Post[]
  loading: boolean
  error: string | null
  editingId: number | null
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

export function PostListSection({
  posts,
  loading,
  error,
  editingId,
  submitting,
  editTitle,
  editContent,
  onEditTitleChange,
  onEditContentChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: PostListSectionProps) {
  return (
    <section className="panel">
      <h2>글 목록</h2>
      {loading && <p>불러오는 중...</p>}
      {error && <p className="error">오류: {error}</p>}
      {!loading && posts.length === 0 && <p>등록된 글이 없습니다.</p>}

      <ul className="post-list">
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            isEditing={editingId === post.id}
            submitting={submitting}
            editTitle={editTitle}
            editContent={editContent}
            onEditTitleChange={onEditTitleChange}
            onEditContentChange={onEditContentChange}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  )
}
