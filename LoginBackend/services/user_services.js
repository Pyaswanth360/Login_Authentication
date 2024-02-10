const { User,Role } = require('../models/user_model');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'venkat162m@gmail.com', // Replace with your Gmail email
    pass: 'gmvi jcnv zigx lrxc', // Replace with your Gmail password
  },
});

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log('Username:', username);

  try {
    // Find user by username
    const user = await User.findOne({ username });
    console.log('User:', user);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is active
    if (!user.is_active) {
      return res.status(401).json({ message: 'User is not active. Login is not allowed.' });
    }
    
    // Check if password is correct
    console.log('Provided password:', password);
    console.log('Stored hashed password:', user.password);

    const isPasswordValid = await bcrypt.compare(password,user.password);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('invalid password')
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if it's the user's first login and force password change
    if (user.forcePasswordChange) {
      return res.status(200).json({
        message: 'First login. Change password.',
        userId: user._id,
        forcePasswordChange: user.forcePasswordChange,
        username:user.firstName + user.lastName,
      });
    }

    const userProfileImage = user.userProfileImage; 

    // Fetch the role details for the user
    // const role = await Role.findOne({ roleId: user.roleId });

    // Generate a token (you may use a library like jsonwebtoken)
    const token = jwt.sign(
      { userId: user._id, username: user.username, roleId: user.roleId },
      'jwtSecret',
      { expiresIn: '1h' }
    );

    // Return userId, token, role name, and forcePasswordChange
    res.status(200).json({
      userId: user._id,
      token,
      roleID: user.roleId,
      forcePasswordChange: user.forcePasswordChange,
      username:user.firstName + user.lastName,
      userProfileImage,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const bcrypt = require('bcryptjs'); // Make sure to install the 'bcryptjs' package

//Endpoint to reset for first time/change password/forgot password
const userChangePassword = async (req, res) => {
  const { userId, newPassword, resetToken } = req.body;
  console.log(userId, newPassword, resetToken);
 
  try {
    // Find user by userId
    let query;

if (userId) {
  console.log('userid');
  query = { _id: userId };
} else if (resetToken) {
  console.log('resetToken');
  query = { resetToken: resetToken };
} else {
  return res.status(400).json({ message: 'Invalid parameters' });
}

const user = await User.findOne(query);
  console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if newPassword and confirmPassword are equal
    /* if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    } */

    if(resetToken){
     const presentTime= new Date();
     if ( user.resetTokenExpiration >= presentTime) {
      console.log('enterd by token');
      console.log(newPassword.length)
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      console.log(hashedPassword)

    // Update user with the new password
   /*  user.password = hashedPassword ; */
    const Users = await User.findOneAndUpdate({ resetToken:resetToken},{password:hashedPassword,forcePasswordChange:false});
    // If 'forcePasswordChange' flag is present, you can update it here
    console.log(user)
    //user.forcePasswordChange = false;

    await Users.save();
    res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(400).json({ message: 'token expired' });
    }
     
    }else if(userId){
      const hashedPassword = await bcrypt.hash(newPassword, 8);
    console.log(hashedPassword)

    const Users = await User.findOneAndUpdate({_id:userId},{password:hashedPassword,forcePasswordChange:false });
    // If 'forcePasswordChange' flag is present, you can update it here
    //user.forcePasswordChange = false;

    await Users.save();
    res.status(200).json({ message: 'Password changed successfully' });
    }else{
      res.status(500).json({ message: 'data is not availabel' });
    }
    // Hash the new password before saving it to the database
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Endpoint to request a password reset email
const userForgotPassword = async (req, res) => {
  const { email } = req.body;
 console.log(email);
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token and expiration
    const resetToken = randomstring.generate(20);
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token and expiration
    /* user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
 */
    // Send reset email (you may customize the email content)
    const updateduser= await User.findOneAndUpdate({email:email},{resetToken:resetToken,resetTokenExpiration:resetTokenExpiration  })
    await updateduser.save();
    const transporter = nodemailer.createTransport({
      // Your email configuration
      service: 'gmail',
      auth: {
        user: 'venkat162m@gmail.com',
        pass: 'gmvi jcnv zigx lrxc',
      },
    });

    await transporter.sendMail({
      from: 'sai1999naguboina@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://192.168.29.225:3000/ResetPassword/${resetToken}`,
    });

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






//Endpoint to user logout
const userLogout = async (req, res) => {
  const userToken = req.headers.authorization; // Assuming you're sending the token in the Authorization header

  // Check if the user is authenticated
  if (!userToken || !sessions[userToken]) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    // Logout the user by removing their session
    delete sessions[userToken];
    res.status(200).json({ message: 'Logged out successfully' });
  }
};

module.exports = {
  userLogin,
  userChangePassword,
  userForgotPassword,
  userLogout
};

