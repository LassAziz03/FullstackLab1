import { useState } from "react";

function VideoList({ videos, fetchVideos, user, search }) {
  const [editNotes, setEditNotes] = useState("");
  const filteredVideos = videos.filter((video) =>
  video.title.toLowerCase().includes(search.toLowerCase())
  );
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");


  const deleteVideo = async (id) => {
    const confirmDelete = window.confirm("Delete this video?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/videos/${id}`, {
      method: "DELETE"
    });

    fetchVideos(user._id);
  };
  const startEdit = (video) => {
    setEditingId(video._id);
    setEditTitle(video.title);
    setEditNotes(video.notes || "");
  };

  const updateVideo = async (id) => {
    await fetch(`http://localhost:3000/api/videos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        notes: editNotes
      })
    });

    setEditingId(null);
    fetchVideos(user._id);
  };

  return (
    <div>
      <h2>Saved Videos</h2>

      {filteredVideos.length === 0 && <p>No videos found.</p>}

      <ul>
        {filteredVideos.map((video) => (
          <li key={video._id}>
            {editingId === video._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />

                <button onClick={() => updateVideo(video._id)}>
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <a href={video.url} target="_blank">
                  {video.title}
                </a>

                <p>Category: {video.categoryId?.name}</p>
                <p>Notes: {video.notes}</p>

                <button onClick={() => startEdit(video)}>
                  Edit
                </button>

                <button onClick={() => deleteVideo(video._id)}>
                  Delete
                </button>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;