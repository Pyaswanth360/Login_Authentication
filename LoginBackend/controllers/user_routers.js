const express = require('express');
const router = express.Router();
const userService = require('../services/user_services');
const verifyToken = require('../middleware/authMiddleware');


const multer = require('multer');
  const storage = multer.diskStorage({
    destination: '../login_web/public/uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });
  
//Route to user login
router.post('/user-login', userService.userLogin);

//Route to change user password
router.post('/user-change-password', userService.userChangePassword);

//Route to forgot password
router.post('/user-forgot-password', userService.userForgotPassword);

//Route to user logout
router.post('/user-logout', verifyToken, userService.userLogout);

module.exports = router;


