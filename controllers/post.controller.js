const PostModel = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, summary, content, cover, author } = req.body;
  if (!title || !summary || !content || !cover || !author) {
    return res.status(400).send({
      message: "Please provide all fields",
    });
  }
  try {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover,
      author: author,
    });
    if (!postDoc) {
      return res.status(500).send({
        message: "Cannot create a new post",
      });
    }
    res.send({ message: "Create post Successfully ", data: postDoc });
  } catch (error) {
    res.status(500).send({
      message: "create post error",
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 }) // เรียงล่าสุดก่อน
      .limit(20); // จำกัด 20 post ล่าสุด

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Get all posts error" });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      message: "Id is missing",
    });
  }
  try {
    const post = await PostModel.findById(id).populate("author", ["username"]);
    if (!post) {
      return res.status(404).send({
        message: "Post not found",
      });
    }
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "create post error",
    });
  }
};

exports.getByAuthorId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      message: "AuthorId is missing",
    });
  }
  try {
    const posts = await PostModel.find({ author: id }).populate("author", [
      "username",
    ]);

    if (!posts) {
      return res.status(404).send({
        message: "Post not found",
      });
    }
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "create post error",
    });
  }
};

exports.upDatePost = async (req, res) => {};