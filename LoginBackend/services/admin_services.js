const { User,Role } = require('../models/user_model');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sai1999naguboina@gmail.com', // Replace with your Gmail email
    pass: 'gmvi jcnv zigx lrxc', // Replace with your Gmail password
  },
});

//To generate new password automatically by mathematical logic
const generateRandomPassword = () => {
  const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '@$!%*?&';
  const numericalChars = '0123456789';

  const allChars =
    uppercaseChar + specialChars + numericalChars + 'abcdefghijklmnopqrstuvwxyz';

  const getRandomChar = (charSet) => {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  };

  let password = '';
  password += getRandomChar(uppercaseChar); // At least one uppercase character
  password += getRandomChar(specialChars);  // At least one special character
  password += getRandomChar(numericalChars); // At least one numerical character

  // Fill the rest of the password with random characters
  for (let i = password.length; i < 12; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the password characters
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
};



// TO CREATE ADMIN / NORMAL USER
const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    mobileNo,
    email,
    roleId,
  } = req.body;
  console.log(firstName);
  console.log(firstName, lastName,  mobileNo, email, roleId,)

  
  const username = email;
  const password = /* randomstring.generate(8) */generateRandomPassword();
   console.log(password);
  try {
    // Check if roleId is provided and valid (you might want more thorough validation)
    /* if (!roleId || typeof roleId !== 'number') {
      return res.status(400).json({ message: 'Invalid roleId provided.' });
    } */

    const user = new User({
      firstName,
      lastName,
      mobileNo,
      email,
      username,
      password,
      roleId,
      userProfileImage: req.file?.filename ?? '', // If req.file or req.file.filename is undefined, set to an empty string
    });
    
    await user.save();
   console.log(user);
    await transporter.sendMail({
      from: 'sai1999naguboina@gmail.com',
      to: email,
      subject: 'Your account details',
      text: `Username: ${username}\nPassword: ${password}`,
    });

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


 const adminLogin = async (req, res) => {
  const LoginData = req.body;
 console.log(LoginData.username);
 const username=LoginData.username;
 const password=LoginData.password;
 console.log(password);
  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is active
    if (!user.is_active) {
      return res.status(401).json({ message: 'User is not active. Login is not allowed.' });
    }

    // Check if password is correct
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if it's the user's first login and force password change
    if (user.forcePasswordChange) {
      // You may return some information to the front end to prompt for a password change
      return res.status(200).json({
        message: 'First login. Change password.',
        userId: user._id,
        forcePasswordChange: user.forcePasswordChange,
      });
    }

    // Fetch the role details for the user
    const role = await Role.findOne({ roleId: user.roleId });

    // Generate a token (you may use a library like jsonwebtoken)
    const token = jwt.sign(
      { userId: user._id, username: user.username, roleId: user.roleId },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    // Return userId, token, role name, and forcePasswordChange
    res.status(200).json({
      userId: user._id,
      token,
      roleName: role.roleName,
      forcePasswordChange: user.forcePasswordChange,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



 // Make sure to install the 'bcryptjs' package

//Endpoint to reset for first time/change password/forgot password
const adminchangePassword = async (req, res) => {
  const { userId, newPassword, confirmPassword } = req.body;
  console.log(req.body);
console.log(userId);
  try {
    // Find user by userId
    const user = await User.findOne({_id:userId});

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if newPassword and confirmPassword are equal
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with the new password
    user.password = hashedPassword;
    // If 'forcePasswordChange' flag is present, you can update it here
    user.forcePasswordChange = false;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Endpoint to request a password reset email
const adminForgotPassword = async (req, res) => {
  const { email } = req.body;

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
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send reset email (you may customize the email content)
    const transporter = nodemailer.createTransport({
      // Your email configuration
      service: 'gmail',
      auth: {
        user: 'sai1999naguboina@gmail.com',
        pass: 'gmvi jcnv zigx lrxc',
      },
    });

    await transporter.sendMail({
      from: 'sai1999naguboina@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3050/reset-password/${resetToken}`,
    });

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

 // Endpoint to get user details by ID
const getAdminDetails = async (req, res) => {
 const userId = req.params.id;

  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAdminDetails = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    Object.assign(user, updateData);
    await user.save();

    // Return updated user details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAdminDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find user by ID and remove
    const user = await User.findByIdAndDelete(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return deleted user details
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const adminLogout = async (req, res) => {
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
  createUser,
  adminLogin,
  adminchangePassword,
  adminForgotPassword,
  getAdminDetails,
  updateAdminDetails,
  deleteAdminDetails,
  adminLogout,
 


};

