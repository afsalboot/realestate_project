const router = require('express').Router();
const { getPosts, getPost, addPost, updatePost, deletePost } = require('../controller/post.controller');
// const {verifyToken} = require('../middleware/verifyToken')
const multer = require('multer');


const storage = multer.diskStorage({

    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }

  })

  const upload = multer({ storage: storage });

router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/add", upload.array("images", 4), addPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);



module.exports = router;