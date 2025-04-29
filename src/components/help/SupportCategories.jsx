import { HelpCircle, FileText, Video, Book, MessageSquare, Zap } from "lucide-react"

const SupportCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Getting Started",
      icon: <Zap size={24} />,
      description: "New to StockChain AI? Start here",
      link: "#getting-started",
    },
    {
      id: 2,
      title: "Frequently Asked Questions",
      icon: <HelpCircle size={24} />,
      description: "Quick answers to common questions",
      link: "#faq",
    },
    {
      id: 3,
      title: "Documentation",
      icon: <FileText size={24} />,
      description: "Detailed guides and references",
      link: "#documentation",
    },
    {
      id: 4,
      title: "Video Tutorials",
      icon: <Video size={24} />,
      description: "Learn by watching step-by-step videos",
      link: "#tutorials",
    },
    {
      id: 5,
      title: "Knowledge Base",
      icon: <Book size={24} />,
      description: "In-depth articles and resources",
      link: "#knowledge-base",
    },
    {
      id: 6,
      title: "Contact Support",
      icon: <MessageSquare size={24} />,
      description: "Get help from our support team",
      link: "#contact",
    },
  ]

  return (
    <div className="support-categories">
      {categories.map((category) => (
        <a href={category.link} key={category.id} className="category-card">
          <div className="category-icon">{category.icon}</div>
          <div className="category-content">
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

export default SupportCategories
