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

  const fetchCategories = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/categories/user/${userId}`);
    const data = await res.json();
    setCategories(data);
  };

  const fetchVideos = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/videos/user/${userId}`);
    const data = await res.json();
    setVideos(data);
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

      <CategoryForm user={user} fetchCategories={fetchCategories} />

      <VideoForm
        user={user}
        categories={categories}
        fetchVideos={fetchVideos}
      />

      <VideoList videos={videos} fetchVideos={fetchVideos} user={user} />
    </div>
  );
}

export default App;