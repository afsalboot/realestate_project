const { getUsers, getUser, updateUser, deleteUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/verifyToken')

const router = require('express').Router();

router.get("/",getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id", updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router