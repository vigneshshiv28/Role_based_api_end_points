const express = require('express');
const verifyToken = require('../middleware/auth');
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const { getUsersDetails, updateUserDetails, deleteUser } = require('../controllers/Admin');

const router = express.Router();

router.get('/', verifyToken, getUsersDetails);
router.patch('/', verifyToken,upload.single("profileImage"), updateUserDetails);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;