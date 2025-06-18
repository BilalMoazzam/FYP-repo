const UserComments = ({ comments }) => {
  return (
    <div className="user-comments-container">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">

              <div className="user-info">
                <h4>{comment.user.name}</h4>
                <p>{comment.user.role}</p>
                <small>{comment.date}</small>
              </div>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default UserComments
