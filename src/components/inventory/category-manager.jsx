  "use client"

  import { useState } from "react"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Label,
    Textarea,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui-components"
  import { Plus, Edit, Trash2,  FolderPlus, Package, Shirt } from "lucide-react"

  export function CategoryManager() {
    const [categories, setCategories] = useState([
      {
        id: "1",
        name: "Men Shalwar Kameez",
        description: "Traditional Shalwar Kameez for men in various fabrics and colors",
        productCount: 25,
        isActive: true,
        createdAt: "2024-01-01",
      },
      {
        id: "2",
        name: "Formal Men",
        description: "Formal and office wear Shalwar Kameez for men",
        parentId: "1",
        productCount: 12,
        isActive: true,
        createdAt: "2024-01-02",
      },
      {
        id: "3",
        name: "Casual Men",
        description: "Casual and everyday wear Shalwar Kameez for men",
        parentId: "1",
        productCount: 13,
        isActive: true,
        createdAt: "2024-01-03",
      },
      {
        id: "4",
        name: "Women Shalwar Kameez",
        description: "Traditional Shalwar Kameez for women in various designs and fabrics",
        productCount: 35,
        isActive: true,
        createdAt: "2024-01-04",
      },
      {
        id: "5",
        name: "Formal Women",
        description: "Formal and party wear Shalwar Kameez for women",
        parentId: "4",
        productCount: 18,
        isActive: true,
        createdAt: "2024-01-05",
      },
      {
        id: "6",
        name: "Casual Women",
        description: "Casual and everyday wear Shalwar Kameez for women",
        parentId: "4",
        productCount: 17,
        isActive: true,
        createdAt: "2024-01-06",
      },
      {
        id: "7",
        name: "Children Shalwar Kameez",
        description: "Traditional Shalwar Kameez for children of all ages",
        productCount: 20,
        isActive: true,
        createdAt: "2024-01-07",
      },
      {
        id: "8",
        name: "Boys",
        description: "Shalwar Kameez for boys (2-13 years)",
        parentId: "7",
        productCount: 12,
        isActive: true,
        createdAt: "2024-01-08",
      },
      {
        id: "9",
        name: "Girls",
        description: "Shalwar Kameez for girls (2-13 years)",
        parentId: "7",
        productCount: 8,
        isActive: true,
        createdAt: "2024-01-09",
      },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      parentId: "",
      isActive: true,
    })

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const parentCategories = categories.filter((cat) => !cat.parentId)

    const getCategoryHierarchy = (category) => {
      if (!category.parentId) return category.name
      const parent = categories.find((cat) => cat.id === category.parentId)
      return parent ? `${parent.name} > ${category.name}` : category.name
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      if (editingCategory) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id
              ? {
                  ...cat,
                  name: formData.name,
                  description: formData.description,
                  parentId: formData.parentId || undefined,
                  isActive: formData.isActive,
                }
              : cat,
          ),
        )
      } else {
        const newCategory = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          parentId: formData.parentId || undefined,
          productCount: 0,
          isActive: formData.isActive,
          createdAt: new Date().toISOString().split("T")[0],
        }
        setCategories((prev) => [...prev, newCategory])
      }

      resetForm()
    }

    const resetForm = () => {
      setFormData({
        name: "",
        description: "",
        parentId: "",
        isActive: true,
      })
      setEditingCategory(null)
      setIsDialogOpen(false)
    }

    const handleEdit = (category) => {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        description: category.description,
        parentId: category.parentId || "",
        isActive: category.isActive,
      })
      setIsDialogOpen(true)
    }

    const handleDelete = (category) => {
      setCategoryToDelete(category)
      setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
      if (!categoryToDelete) return;
    
      // Delete the category regardless of type or relationships
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryToDelete.id));
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    
      setTimeout(() => {
        alert(`Category "${categoryToDelete.name}" has been permanently deleted.`);
      }, 100);
    };
    
    

    const toggleStatus = (categoryId) => {
      setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat)))
    }


    return (
      <div >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              style={{
                width: "580px",
                paddingBottom:"25px",
                paddingInline:"10px",
                backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
                border: "none",
                borderRadius: "16px",
                color: "white",
              }}
            >
              <DialogHeader>
                <DialogTitle
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    // margin:"20px",
                    // gap: "12px",
                  }}
                >
                  {editingCategory ? "Edit Category" : ""}
                </DialogTitle>
                <DialogDescription style={{ color: "#000", fontSize: "6px" }}>
                  {editingCategory ? "Update category information" : ""}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  style={{
                    // margin:"30px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Label htmlFor="name" style={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                    Category Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Formal Men, Wedding Collection"
                    required
                    style={{
                      paddingInline: "20px",
                      marginInline:"10px",
                      width:"350px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Label htmlFor="description" style={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this category..."
                    rows={3}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      paddingInline: "20px",
                      marginInline:"45px",
                      width:"350px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Label htmlFor="parent" style={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                    Parent Category
                  </Label>
                  <select
                    value={formData.parentId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, parentId: e.target.value }))}
                    style={{
                      paddingInline: "20px",
                      marginInline:"16px",
                      width:"350px",
                      padding: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">No Parent (Main Category)</option>
                    {parentCategories
                      .filter((cat) => cat.id !== editingCategory?.id)
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    style={{ width: "18px", height: "18px",
                      marginInline:"6px",
                      }}
                  />
                  <Label htmlFor="isActive" style={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                    Category is active
                  </Label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "black",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#10b981",
                      color: "black",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    {editingCategory ? " Update Category" : ""}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Categories</span>
            </CardTitle>
            <CardDescription>Manage your Shalwar Kameez categories and subcategories</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      
                        <div>
                          <p style={{ fontWeight: "500", fontSize: "14px" }}>{getCategoryHierarchy(category)}</p>
                          {category.parentId && <p style={{ fontSize: "12px", color: "#6b7280" }}>Subcategory</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "200px" }}>{category.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" style={{ backgroundColor: "#f0f9ff", color: "#0369a1" }}>
                        {category.productCount} items
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                        style={{
                          backgroundColor: category.isActive ? "#dcfce7" : "#f3f4f6",
                          color: category.isActive ? "#166534" : "#6b7280",
                        }}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ fontSize: "14px", color: "#6b7280" }}>{category.createdAt}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(category)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            backgroundColor: "#10b981",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#059669"
                            e.target.style.transform = "translateY(-1px)"
                            e.target.style.boxShadow = "0 4px 8px rgba(16, 185, 129, 0.3)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#10b981"
                            e.target.style.transform = "translateY(0)"
                            e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.2)"
                          }}
                          title="Edit Category"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>

                        {/* Status Toggle Button */}
                        <button
                          onClick={() => toggleStatus(category.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            backgroundColor: category.isActive ? "#f59e0b" : "#6366f1",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: category.isActive
                              ? "0 2px 4px rgba(245, 158, 11, 0.2)"
                              : "0 2px 4px rgba(99, 102, 241, 0.2)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = category.isActive ? "#d97706" : "#4f46e5"
                            e.target.style.transform = "translateY(-1px)"
                            e.target.style.boxShadow = category.isActive
                              ? "0 4px 8px rgba(245, 158, 11, 0.3)"
                              : "0 4px 8px rgba(99, 102, 241, 0.3)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = category.isActive ? "#f59e0b" : "#6366f1"
                            e.target.style.transform = "translateY(0)"
                            e.target.style.boxShadow = category.isActive
                              ? "0 2px 4px rgba(245, 158, 11, 0.2)"
                              : "0 2px 4px rgba(99, 102, 241, 0.2)"
                          }}
                          title={category.isActive ? "Deactivate Category" : "Activate Category"}
                        >
                          {category.isActive ? "🔒" : "✅"}
                          <span>{category.isActive ? "Disable" : "Enable"}</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(category)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#dc2626"
                            e.target.style.transform = "translateY(-1px)"
                            e.target.style.boxShadow = "0 4px 8px rgba(239, 68, 68, 0.3)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#ef4444"
                            e.target.style.transform = "translateY(0)"
                            e.target.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.2)"
                          }}
                          title="Delete Category"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCategories.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px" }}>
                <Shirt size={48} style={{ margin: "0 auto 16px", opacity: 0.3, color: "#9ca3af" }} />
                <p style={{ color: "#6b7280", fontSize: "16px", fontWeight: "500" }}>No categories found</p>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  {searchTerm ? "Try adjusting your search" : "Start by adding your first category"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <Card>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#eff6ff",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FolderPlus size={24} style={{ color: "#3b82f6" }} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Total Categories</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: "4px 0 0 0" }}>{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Package size={24} style={{ color: "#16a34a" }} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Active Categories</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: "4px 0 0 0" }}>
                    {categories.filter((cat) => cat.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#fef3c7",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Shirt size={24} style={{ color: "#f59e0b" }} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Total Items</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", margin: "4px 0 0 0" }}>
                    {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent
            style={{
              maxWidth: "450px",
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
              border: "none",
              borderRadius: "16px",
              color: "white",
              textAlign: "center",
            }}
          >
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                🗑️ Delete Category
              </DialogTitle>
            </DialogHeader>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "24px",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                marginBottom: "24px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
              <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
                Are you sure you want to delete this category?
              </p>
              <p style={{ fontSize: "16px", color: "#ffe8e8", marginBottom: "16px" }}>
                <strong>"{categoryToDelete?.name}"</strong>
              </p>
              <p style={{ fontSize: "14px", color: "#ffcccb" }}>
                This action cannot be undone. The category will be permanently removed.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px",paddingBlock:"20px" }}>
              <button
                onClick={() => setDeleteDialogOpen(false)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                ❌ Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                }}
              >
                🗑️ Delete Forever
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
