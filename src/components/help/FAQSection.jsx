"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = () => {
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      faqs: [
        {
          id: "faq1",
          question: "What is the purpose of this platform?",
          answer:
            "The purpose of this platform is to provide an enhanced supply chain management through the integration of cutting-edge blockchain technology. It offers a secure, transparent, and efficient way to track inventory, manage orders, and verify transactions across your entire supply chain network. By leveraging blockchain, we ensure data integrity and immutability, giving you confidence in your operational decisions.",
        },
        {
          id: "faq2",
          question: "Why use our service?",
          answer:
            "Our service combines the power of blockchain technology with user-friendly inventory management tools to provide a comprehensive solution for modern businesses. We offer real-time tracking, secure transaction verification, automated inventory updates, and detailed analytics - all in one integrated platform. Our solution reduces errors, prevents fraud, improves efficiency, and provides valuable insights for better decision-making.",
        },
        {
          id: "faq3",
          question: "Is this platform secure?",
          answer:
            "Yes, security is our top priority. We implement multiple layers of protection including end-to-end encryption, multi-factor authentication, role-based access controls, and blockchain verification for all transactions. Our platform undergoes regular security audits and penetration testing to ensure your data remains protected. Additionally, all blockchain transactions are immutable and transparent, providing an extra layer of security and trust.",
        },
      ],
    },
    {
      id: "account",
      title: "Account Management",
      faqs: [
        {
          id: "faq4",
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link. Click the link in the email and follow the instructions to create a new password. For security reasons, the reset link expires after 24 hours. If you don't receive the email, check your spam folder or contact our support team for assistance.",
        },
        {
          id: "faq5",
          question: "Can I have multiple users for my account?",
          answer:
            "Yes, you can add multiple users to your account with different permission levels. Go to User Management in the sidebar, click 'Add User', and enter their details. You can assign roles such as Admin, Manager, or Viewer to control their access levels. Each user will receive an email invitation to join your account. You can manage user permissions, deactivate accounts, or remove users at any time through the User Management section.",
        },
      ],
    },
    {
      id: "inventory",
      title: "Inventory Management",
      faqs: [
        {
          id: "faq6",
          question: "How do I add new inventory items?",
          answer:
            "To add new inventory items, navigate to the Inventory Management page and click the 'Add Item' button in the top right corner. Fill in the required fields in the form that appears, including item name, category, quantity, price, supplier, and status. You can also add optional details such as description, SKU, or custom fields. Once completed, click 'Save Item' to add it to your inventory. The new item will be automatically recorded on the blockchain for verification and tracking.",
        },
        {
          id: "faq7",
          question: "Can I import inventory data from other systems?",
          answer:
            "Yes, you can import inventory data from other systems using our import tool. Go to Inventory Management and click the 'Import' button. You can upload CSV, Excel, or JSON files with your inventory data. Our system will guide you through mapping your data fields to our system fields. You can preview the data before finalizing the import to ensure accuracy. For large datasets or complex migrations, our support team can provide additional assistance to ensure a smooth transition.",
        },
      ],
    },
    {
      id: "blockchain",
      title: "Blockchain Features",
      faqs: [
        {
          id: "faq8",
          question: "How does blockchain verification work?",
          answer:
            "Blockchain verification works by creating a unique, immutable record (hash) of each transaction in your supply chain. When inventory is added, transferred, or updated, a new block is created containing the transaction details. This block is verified by multiple nodes in the network and added to the chain. You can view these verifications in the Blockchain Transaction page. Each transaction includes details such as timestamp, sender, receiver, and a cryptographic hash that ensures the data cannot be altered. This provides a transparent, tamper-proof record of your entire supply chain history.",
        },
        {
          id: "faq9",
          question: "Can I track the history of an item through blockchain?",
          answer:
            "Yes, you can track the complete history of any item through our blockchain ledger. Navigate to the Blockchain Transaction page and search for the item by ID or name. You'll see a chronological list of all transactions involving that item, including creation, transfers, updates, and status changes. Each transaction shows details such as timestamp, location, handler, and verification status. This provides end-to-end visibility of your products throughout the supply chain, helping with authenticity verification, compliance documentation, and issue resolution.",
        },
      ],
    },
  ]

  const [expandedCategory, setExpandedCategory] = useState("general")
  const [expandedFaqs, setExpandedFaqs] = useState(["faq1"])

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const toggleFaq = (faqId) => {
    setExpandedFaqs((prevExpandedFaqs) =>
      prevExpandedFaqs.includes(faqId) ? prevExpandedFaqs.filter((id) => id !== faqId) : [...prevExpandedFaqs, faqId],
    )
  }

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqCategories.map((category) => (
          <div key={category.id} className="faq-category">
            <div className="category-header" onClick={() => toggleCategory(category.id)}>
              <h3>{category.title}</h3>
              {expandedCategory === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {expandedCategory === category.id && (
              <div className="category-content">
                {category.faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                      <h4>{faq.question}</h4>
                      {expandedFaqs.includes(faq.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedFaqs.includes(faq.id) && <div className="faq-answer">{faq.answer}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
