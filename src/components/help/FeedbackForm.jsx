"use client"

import { useState } from "react"
import { Send } from "lucide-react"

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setLoading(true)

    // Simulate API call to submit feedback
    setTimeout(() => {
      console.log("Feedback submitted:", feedback)
      setSubmitted(true)
      setLoading(false)
      setFeedback("")

      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 1000)
  }

  return (
    <div className="feedback-form-container">
      <h2>Feedback</h2>
      <div className="feedback-form-wrapper">
        <div className="feedback-image">
          <img src="/placeholder.svg?height=200&width=150" alt="Feedback" />
        </div>
        <div className="feedback-form">
          <h3>Give us some feedback</h3>
          {submitted ? (
            <div className="feedback-success">
              <p>Thank you for your feedback! We appreciate your input.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  placeholder="Share your thoughts on how we can improve..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={loading || !feedback.trim()}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
