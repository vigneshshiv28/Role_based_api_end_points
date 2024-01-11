const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const { signUp, login } = require('../controllers/auth');

const router = express.Router();

router.post('/signup',upload.single("profileImage"), signUp);
router.post('/login', login);

module.exports = router;
