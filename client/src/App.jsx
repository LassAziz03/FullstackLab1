import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import CategoryForm from "./components/CategoryForm";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCategories = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/categories/user/${userId}`);
    const data = await res.json();
    setCategories(data);
  };

const fetchVideos = async (userId) => {
  try {
    setLoading(true);
    setError("");

    const res = await fetch(`http://localhost:3000/api/videos/user/${userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await res.json();
    setVideos(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!user) return;

    fetchCategories(user._id);
    fetchVideos(user._id);

    const interval = setInterval(() => {
      fetchVideos(user._id);
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return <LoginForm setUser={setUser} setError={setError} error={error} />;
  }

  return (
    <div>
      <h1>MMA Video Library</h1>
      <p>Logged in as: {user.username}</p>
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CategoryForm user={user} fetchCategories={fetchCategories} />

      <VideoForm
        user={user}
        categories={categories}
        fetchVideos={fetchVideos}
      />

      <VideoList
        videos={videos}
        fetchVideos={fetchVideos}
        user={user}
        search={search}
      />
    </div>
  );
}

export default App;