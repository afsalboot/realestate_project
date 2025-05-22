const { getUsers, getUser, updateUser, deleteUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const router = require('express').Router();

// Multer config
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, './avatar')
    // },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })



const upload = multer({ storage: storage });

// Routes
router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id",verifyToken, upload.single("avatar"),updateUser); 
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
