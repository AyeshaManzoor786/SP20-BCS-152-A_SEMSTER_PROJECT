import Post from "../model/post.js";
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).json({
      msg: "Post saved successfully",
    });
  } catch (error) {
    return res.status(200).json(error);
  }
};
