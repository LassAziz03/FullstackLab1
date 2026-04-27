import { useState } from "react";

function VideoForm({ user, categories, fetchVideos }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const addVideo = async () => {
    if (!categoryId) {
      alert("Choose a category first");
      return;
    }

    await fetch("http://localhost:3000/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        title,
        notes,
        userId: user._id,
        categoryId
      })
    });

    setUrl("");
    setTitle("");
    setNotes("");
    setCategoryId("");
    fetchVideos(user._id);
  };

  return (
    <div>
      <h2>Add Video</h2>

      <input
        placeholder="Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Choose category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button onClick={addVideo}>Add Video</button>
    </div>
  );
}

export default VideoForm;