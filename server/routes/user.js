const express = require('express');
const verifyToken = require('../middleware/auth');
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const { getUserDetail,updateUserDetail, deleteUser } = require('../controllers/user');
const router = express.Router();

router.get('/:id', verifyToken, getUserDetail);
router.patch('/', verifyToken,upload.single("profileImage"),updateUserDetail);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
