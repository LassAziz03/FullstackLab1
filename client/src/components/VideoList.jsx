function VideoList({ videos, fetchVideos, user }) {
  const deleteVideo = async (id) => {
    const confirmDelete = window.confirm("Delete this video?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/api/videos/${id}`, {
      method: "DELETE"
    });

    fetchVideos(user._id);
  };

  return (
    <div>
      <h2>Saved Videos</h2>

      {videos.length === 0 && <p>No videos saved yet.</p>}

      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <a href={video.url} target="_blank">
              {video.title}
            </a>

            <p>Category: {video.categoryId?.name}</p>
            <p>Notes: {video.notes}</p>

            <button onClick={() => deleteVideo(video._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;