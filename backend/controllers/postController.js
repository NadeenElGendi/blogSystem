import Post from "../models/post.js";

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error in getPosts:", err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error in getPostById:", err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Create a post
// @route   POST /api/posts
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      image: req.file?.path || null, // Cloudinary image path
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error("Error in createPost:", err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Check user is owner
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const updateData = {
      title: req.body.title || post.title,
      content: req.body.content || post.content,
      updatedAt: Date.now(),
    };

    // If new image uploaded
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary image path
    }

    post = await Post.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    res.json(post);
  } catch (err) {
    console.error("Error in updatePost:", err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error("Error in deletePost:", err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};
