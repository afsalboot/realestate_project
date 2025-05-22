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

router.get("/",getPosts)
router.get("/:id",getPost)

router.post("/add", (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: "You can upload up to 4 images only." });
        } else if (err) {
            return res.status(500).json({ message: "Image upload failed.", error: err.message });
        }
        next();
    });
},addPost)

router.put("/:id",updatePost)
router.delete("/:id",deletePost)



module.exports = router