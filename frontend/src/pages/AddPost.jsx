import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaSpinner, FaImage, FaTimes } from "react-icons/fa";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle image preview
  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setImgPreview(null);
    }
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (img) formData.append("image", img);

    try {
      await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      });
      toast.success("Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImg(null);
    setImgPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-800 font-medium">
                Title
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-800"
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-800 font-medium">
                Content
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered h-64 w-full focus:ring-2 focus:ring-blue-800"
              required
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-800 font-medium">
                Image (Optional)
              </span>
            </label>
            {imgPreview ? (
              <div className="relative">
                <img
                  src={imgPreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaImage className="text-3xl text-blue-500 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload an image
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-800 hover:bg-blue-900 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
