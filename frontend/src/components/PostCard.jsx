import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const PostCard = ({ post, isAuthor, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body p-4">
        {/* Post Title - First Element */}
        <h2 className="card-title text-2xl font-bold mb-2 text-blue-900">
          {post.title}
        </h2>

        {/* Image - Second Element */}
        {post.image && (
          <figure className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </figure>
        )}

        {/* Content - Third Element */}
        <p className="text-blue-800 font-bold mb-6">{post.content}</p>

        {/* Author and Date in Tag - Bottom Right */}
        <div className="card-actions justify-start">
          <div className="flex flex-col items-start">
            <span className="badge badge-neutral mb-1">
              By {post.author?.username}
            </span>
            <span className=" text-gray-700">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Edit/Delete Buttons (for author) */}
        {isAuthor && (
          <div className="flex justify-end gap-2 mt-4">
            <Link
              to={`/edit-post/${post._id}`}
              className="btn btn-primary btn-sm gap-2"
            >
              <FaEdit />
              Edit
            </Link>
            <button
              onClick={() => onDelete(post._id)}
              className="btn btn-error bg-red-600 btn-sm gap-2"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
