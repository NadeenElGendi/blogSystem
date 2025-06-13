import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(
        "Delete error:",
        err.response?.data?.message || err.message
      );
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 bg-fixed">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 min-h-[calc(100vh-4rem)]">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              isAuthor={user?._id === post.author?._id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                No Posts Yet
              </h2>
              <p className="text-gray-500 mb-4">
                Be the first to create a post!
              </p>
              {user && (
                <Link to="/add-post" className="btn btn-primary">
                  Create Your First Post
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
