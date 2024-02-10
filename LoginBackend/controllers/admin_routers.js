const express = require('express');
const router = express.Router();
const adminService = require('../services/admin_services');
const multer = require('multer');
const verifyToken = require('../middleware/authMiddleware');


  const storage = multer.diskStorage({
    destination: '../login_web/public/uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  
  
//Route to create user
router.post('/create-user', verifyToken, upload.single('file'), adminService.createUser);







module.exports = router;


