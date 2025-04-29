"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit, Play, Pause } from "lucide-react"

const AIModels = ({ onSettingsChange }) => {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newModel, setNewModel] = useState({
    name: "",
    type: "Time Series",
    status: "Active",
  })
  const [editingModel, setEditingModel] = useState(null)

  useEffect(() => {
    // Load mock AI models
    loadMockModels()
  }, [])

  const loadMockModels = () => {
    // Mock data for AI models
    const mockModels = [
      {
        id: 1,
        name: "Demand Forecaster",
        type: "Time Series",
        status: "Active",
        lastTrained: "2025-03-15",
        accuracy: "92.5%",
      },
      {
        id: 2,
        name: "Anomaly Detection",
        type: "Classification",
        status: "Inactive",
        lastTrained: "2025-02-28",
        accuracy: "89.3%",
      },
    ]

    setModels(mockModels)
    setLoading(false)
  }

  const handleAddModel = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingModel(null)
    setNewModel({
      name: "",
      type: "Time Series",
      status: "Active",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (editingModel) {
      setEditingModel({
        ...editingModel,
        [name]: value,
      })
    } else {
      setNewModel({
        ...newModel,
        [name]: value,
      })
    }
  }

  const handleSaveModel = () => {
    if (editingModel) {
      // Update existing model
      const updatedModels = models.map((model) => (model.id === editingModel.id ? editingModel : model))
      setModels(updatedModels)
    } else {
      // Add new model
      const newId = Math.max(0, ...models.map((m) => m.id)) + 1
      const modelToAdd = {
        ...newModel,
        id: newId,
        lastTrained: new Date().toISOString().split("T")[0],
        accuracy: "N/A",
      }
      setModels([...models, modelToAdd])
    }

    handleCloseModal()
    onSettingsChange()
  }

  const handleEditModel = (model) => {
    setEditingModel(model)
    setShowAddModal(true)
  }

  const handleDeleteModel = (id) => {
    if (window.confirm("Are you sure you want to delete this AI model?")) {
      const updatedModels = models.filter((model) => model.id !== id)
      setModels(updatedModels)
      onSettingsChange()
    }
  }

  const handleToggleStatus = (id) => {
    const updatedModels = models.map((model) => {
      if (model.id === id) {
        return {
          ...model,
          status: model.status === "Active" ? "Inactive" : "Active",
        }
      }
      return model
    })

    setModels(updatedModels)
    onSettingsChange()
  }

  return (
    <div className="settings-section ai-models-settings">
      <div className="section-header">
        <h2>AI Models</h2>
      </div>

      <div className="models-table-container">
        {loading ? (
          <div className="loading-indicator">Loading AI models...</div>
        ) : (
          <table className="models-table">
            <thead>
              <tr>
                <th>Model Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    No AI models configured
                  </td>
                </tr>
              ) : (
                models.map((model) => (
                  <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.type}</td>
                    <td>
                      <span className={`status-badge ${model.status.toLowerCase()}`}>{model.status}</span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn toggle-btn"
                        onClick={() => handleToggleStatus(model.id)}
                        title={model.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        {model.status === "Active" ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button className="action-btn edit-btn" onClick={() => handleEditModel(model)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteModel(model.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="add-model-container">
        <button className="add-model-btn" onClick={handleAddModel}>
          + Add New Model
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingModel ? "Edit AI Model" : "Add New AI Model"}</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Model Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingModel ? editingModel.name : newModel.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={editingModel ? editingModel.type : newModel.type}
                  onChange={handleInputChange}
                >
                  <option value="Time Series">Time Series</option>
                  <option value="Classification">Classification</option>
                  <option value="Regression">Regression</option>
                  <option value="Clustering">Clustering</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editingModel ? editingModel.status : newModel.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveModel}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIModels
