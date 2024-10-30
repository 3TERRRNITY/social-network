import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'
import { GoBack } from '../../components/go-back'
import { CreateComment } from '../../components/create-comment'

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? '')
  if (!data) {
    return <h2 className='text-xl'>Поста не существует</h2>
  }

  const {
    content,
    id,
    authorId,
    author,
    comments,
    likes,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor='current-post'
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className='mt-10'>
        <CreateComment />
      </div>
      <div className='mt-10'>
        {data.comments
          ? data.comments.map(comment => (
              <Card
                cardFor='comment'
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ''}
                id={id}
                content={comment.content}
                name={comment.user.name ?? ''}
                authorId={comment.userId}
                commentId={comment.id}
              />
            ))
          : null}
      </div>
    </>
  )
}
