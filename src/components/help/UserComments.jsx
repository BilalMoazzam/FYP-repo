const UserComments = () => {
    const comments = [
      {
        id: 1,
        user: {
          name: "Sophia Martinez",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "Supply Chain Manager",
        },
        date: "April 15, 2025 at 2:45 PM",
        content:
          "This platform has completely transformed how we manage our inventory and supply chain. The AI recommendations are incredibly accurate, and the blockchain verification adds a layer of security that gives us peace of mind. Absolutely worth the investment!",
      },
      {
        id: 2,
        user: {
          name: "James Wilson",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "Operations Director",
        },
        date: "April 10, 2025 at 11:30 AM",
        content:
          "After two years of use, I can confidently say this is the best inventory management system we've used. The AI predictions have helped us optimize stock levels, and the blockchain integration ensures complete transparency across our supply chain. The customer support team is also exceptional.",
      },
      {
        id: 3,
        user: {
          name: "Michael Lal",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "Logistics Coordinator",
        },
        date: "April 5, 2025 at 9:15 AM",
        content:
          "Implementation was smooth and the onboarding process was excellent. I was hesitant at first, but the AI features have saved us countless hours of manual work. The blockchain verification has also helped us resolve disputes with suppliers quickly. The interface is intuitive and the mobile app is a game-changer for our field operations.",
      },
    ]
  
    return (
      <div className="user-comments-container">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="user-avatar">
                  <img src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                </div>
                <div className="user-info">
                  <h4 className="user-name">{comment.user.name}</h4>
                  <p className="user-role">{comment.user.role}</p>
                  <p className="comment-date">{comment.date}</p>
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
  