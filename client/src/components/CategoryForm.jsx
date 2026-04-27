import { useState } from "react";

function CategoryForm({ user, fetchCategories }) {
  const [name, setName] = useState("");

  const addCategory = async () => {
    if (!name) return;

    await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        userId: user._id
      })
    });

    setName("");
    fetchCategories(user._id);
  };

  return (
    <div>
      <h2>Create Category</h2>

      <input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addCategory}>Add Category</button>
    </div>
  );
}

export default CategoryForm;