const Post = require('../models/post.schema');


const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET
});


const getPosts = async (req,res) => {
    try{
        const posts = await Post.find(req.body)

        return res.status(200).json({message:"post fetched", posts:posts})
    }catch(err){
        return res.status(500).json({message: "Failed to get posts"})
    }
}

const getPost = async (req,res) => {
    const id = req.params.id
    try{
        const post = await Post.findById(id)

        return res.status(200).json({message:"post", post:post})
    }catch(err){
        return res.status(500).json({message:"Failed to get post"})
    }
}

const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  console.log("tokenUserId",tokenUserId);
  console.log("postdetails",body.postDetails);
  console.log("postdata",body.postData);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded." });
  }

  if (req.files.length > 4) {
    return res.status(400).json({ message: "Maximum of 4 images allowed." });
  }

  try {
    const imageUrls = [];
    for (const file of req.files) {
      const uploadedImage = await cloudinary.uploader.upload(file.path);
      imageUrls.push(uploadedImage.secure_url);
    }

    const newPost = new Post({
      ...body.postData,
      userId: tokenUserId,
      postDetails: body.postDetails,
      images: imageUrls,
    });

    await newPost.save();

    return res.status(200).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error('Post creation error:', err);
    return res.status(500).json({ message: "Failed to add post" });
  }
};

const updatePost = async (req,res) => {
    try{
        return res.status(200).json({message:""})
    }catch(err){
        return res.status(500).json({message:"Failed to update post"})
    }
}

const deletePost = async (req,res) => {
    const id = req.params.id;

    console.log('post id :',id);

    

    try{

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
        return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post deleted successfully" });
        
    }catch(err){
        return res.status(500).json({message:"Failed to delete post"})
    }
}


module.exports = { getPosts,getPost,addPost,updatePost,deletePost }