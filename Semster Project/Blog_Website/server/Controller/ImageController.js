const url = "http://localhost:8000";

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(404).json({
      msg: "The file is not exist here!",
    });
  }
  //mongo DB give us the url of the image which we use further
  const imageUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json({
    imageUrl,
    msg: "The file is upload successfully",
  });
};
