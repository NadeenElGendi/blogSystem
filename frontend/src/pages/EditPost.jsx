import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `/api/posts/${id}`,
        { title: post.title, content: post.content },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast.success("Post updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-blue-800 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 ">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label m-6">
              <span className="label-text text-blue-800 font-medium ">
                Title
              </span>
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="input input-bordered w-full max-w-lg mx-auto focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div className="form-control">
            <label className="label m-3">
              <span className="label-text text-blue-800 font-medium">
                Content
              </span>
            </label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="textarea textarea-bordered h-64 w-full max-w-lg mx-auto focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="btn btn-primary bg-blue-800 hover:bg-blue-900 text-white w-full max-w-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
