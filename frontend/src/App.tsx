import './App.css'
import { PostCreateForm } from './components/PostCreateForm'
import { PostListSection } from './components/PostListSection'
import { usePostsBoard } from './hooks/usePostsBoard'

function App() {
  const {
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
  } = usePostsBoard()

  return (
    <main className="board">
      <header className="board-header">
        <h1>게시판</h1>
        <button className="ghost-btn" onClick={loadPosts} disabled={submitting}>
          새로고침
        </button>
      </header>

      <PostCreateForm
        title={title}
        content={content}
        submitting={submitting}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={onCreate}
      />

      <PostListSection
        posts={posts}
        loading={loading}
        error={error}
        editingId={editingId}
        submitting={submitting}
        editTitle={editTitle}
        editContent={editContent}
        onEditTitleChange={setEditTitle}
        onEditContentChange={setEditContent}
        onStartEdit={startEdit}
        onSaveEdit={onSaveEdit}
        onCancelEdit={cancelEdit}
        onDelete={onDelete}
      />
    </main>
  )
}

export default App
