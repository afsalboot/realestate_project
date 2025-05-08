const { getUsers, getUser, updateUser, deleteUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken');
// const multer = require('multer');
const router = require('express').Router();

// // Multer config
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './avatar')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg/;
//   const isValid = allowedTypes.test(file.mimetype);
//   cb(null, isValid);
// };

// const upload = multer({ storage: storage, fileFilter });

// Routes
router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser); 
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
