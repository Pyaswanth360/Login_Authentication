        import * as React from "react";
        import { useState,useEffect } from "react";
        import { useNavigate, useParams } from "react-router-dom"; 
        import { useLocation } from "react-router-dom";
        import { FaEye, FaEyeSlash } from 'react-icons/fa';
        import '../custom.css';
        import { Link } from "react-router-dom";
        
        function ResetPassword() {
          const Navigate = useNavigate();
          const location = useLocation();
          const UserDetails = location.state;
          // const UserDetails= {_id:'21288n'}
          const [password, setPassword] = useState("");
          const [confirmPassword, setConfirmPassword] = useState("");
          const [passwordError, setPasswordError] = useState(false);
          const [confirmPasswordError,setConfirmPasswordError]= useState('');
          const [EmptyData,setEmptyData]=useState(false);
          const [showPassword, setShowPassword] = useState(false);
          const [ShowConfimPassword, setShowConfimPassword] = useState(false);
          const {resetToken}= useParams();

          const ResetPassword = process.env.REACT_APP_FORE_APILINK + '/user/user-change-password';
          //password validation logic 
          const validatePassword = (password) => {
            const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordValidation.test(password);
          };
//This function calls when password inputfield changes 
console.log(UserDetails)
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setEmptyData(false);
    setConfirmPasswordError(false);

    // Validate password function called and check if password dose not satisfy the requiremnents it enters an error message shown.
    
    if (!validatePassword(newPassword)) {
      setPasswordError(true);
    } else {
      //
      setPasswordError(false);
    }
  };
//This function calls when confimpassword inputfield changes 
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setEmptyData(false);
    // Validate password match
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(false);
    }
  };
 //when submit button clicked this function called 
 const handleSubmit = async() => {
   
  // For example, you can check if the passwords are valid and proceed accordingly
  if (!password || !confirmPassword) {
    setEmptyData("Please fill all password inputfields.");
      return;
    }else if (confirmPassword !== password) {
      setConfirmPasswordError("Both Passwords you enterd do not match.");

    }
  else if (validatePassword(password) && password === confirmPassword) {
    // Proceed with the submission
   /*  console.log(password);
    console.log(UserDetails.LoginData.userId);
    console.log(UserDetails); */
    const resetData = UserDetails
    ? {
        newPassword: password,
        userId: UserDetails?.userId || '',
      }
    : {
        newPassword: password,
        resetToken: resetToken,
      };
    

    console.log("Passwords are valid. Submitting..." , resetData );
    const res = await fetch(ResetPassword, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetData),
    });
    if(res.ok){
      //if response ok it navigates to login page 
     console.log(res);
      Navigate('/');
      
      localStorage.removeItem('LoginData');
        const loginPageUrl = '/';
    
        // Push multiple states to the history to prevent going back to the homepage
        if (window.history && window.history.pushState) {
          for (let i = 0; i < 40; i++) {
            window.history.pushState({}, document.title, loginPageUrl);
          }
    
          window.addEventListener('popstate', function (event) {
            if (event.state === null) {
              for (let i = 0; i < 41; i++) {
                window.history.pushState({}, document.title, loginPageUrl);
              }
            }
          });
        }
    
        // Redirect the user to the login page
        window.location.replace(loginPageUrl);
    
    }
  } else {
    // Show an error message or prevent submission
    console.log("Invalid passwords. Please fix the errors.");
  }
};
  const PasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const ConfimPasswordVisibility = () => {
    setShowConfimPassword((prev) => !prev);
  };

         // const [UserToken,setUserToken]= useState('');
          /* useEffect (()=>{
        const Token =  localStorage.getItem('UserToken');
        setUserToken(Token);
          },[]); */

          return (
            <div className="flex-col justify-center items-center h-screen bg-[#f9f4f4] font-roboto">
          
          <div className="w-full h-1/7  border-b-[1px] border-black-500 bg-[#959BB0] bg-opacity-[10%] text-[28px] px-4">
              <div className="w-full flex space-x-2 justify-between h-auto ">
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[50px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              <div className="bg-black bg-opacity-20 w-[2px] h-[30px]" />
              </div>
        
          <div className="flex justify-center mb-0">
          <p className="mb-0 ">RESET PASSWORD</p>
        </div>     
          </div>   

          <div className="flex justify-center bg-[#f9f4f4]">
          <div className="mt-[80px] lg:mt-[100px] md:mt-[150px] 2xl:mt-[150px] items-center flex justify-center" >
          
            <div className=" flex-col p-12 flex items-center bg-[#959BB0] bg-opacity-[15%] rounded-sm   ">
            <p className="text-2xl   ">Reset Password</p>
            <div className=" flex-col flex justify-center items-center space-y-4 mt-6 p-2">
              <div className="relative flex-col space-y-4 flex justify-center items-center   ">
              <p className="text-sm">Enter New Password</p>
              <div className="relative flex items-center">
  <input
    type={showPassword ? "text" : "password"}
    className="w-5/6 md:w-full rounded-sm focus:outline-none focus:ring-[2px] focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-sm px-2 py-1 pr-2 pl-8 text-[12px] placeholder-text-xs placeholder-text-center"
    placeholder="New password"
    value={password}
    onChange={handlePasswordChange}
  />
  <span
    className="flex justify-center items-center cursor-pointer absolute left-1"
    onClick={PasswordVisibility}
  >
    {showPassword ? (
      <FaEye className="text-sm text-gray-400" />
    ) : (
      <FaEyeSlash className="text-sm text-gray-400" />
    )}
    {/* Adjust the margin values to center the border-r */}
    <div className="ml-1 mr-2 border-r border-gray-300 h-6"></div>
  </span>
</div>

              </div>
           
            {passwordError && (
          <p className="text-[12px] text-red-500 text-center">Password must be  8 characters <br/>  and include at least one uppercase (A), <br/>   one digit(1), and one special character(@).</p>
        )}
            <p className="text-sm"> Confim Password</p>
            <div className="relative flex justify-center items-center">
  <input
    type={ShowConfimPassword ? "text" : "password"}
    className="w-5/6 md:w-full rounded-sm focus:outline-none focus:ring-[2px] focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-sm px-2 py-1 pr-2 pl-8 text-[12px] placeholder-text-xs placeholder-text-center"
    placeholder="Confirm new password"
    value={confirmPassword}
    onChange={handleConfirmPasswordChange}
  />
  <span
    className="flex justify-center items-center  absolute left-1"
    onClick={ConfimPasswordVisibility}
  >
    {ShowConfimPassword ? (
      <FaEye className="text-sm text-gray-400 cursor-pointer" />
    ) : (
      <FaEyeSlash className="text-sm text-gray-400 cursor-pointer" />
    )}
    {/* Adjust the margin values to center the border-r */}
    <div className="ml-1 mr-2 border-r border-gray-300 h-6"></div>
  </span>
</div>

            
           
          <p className="text-[12px] text-red-500">{confirmPasswordError}</p>
          
            {/* <p className="underline text-[#2158E5] hover:text-blue-700 cursor-pointer text-sm" >Forgot Password</p> */}

            <button className="text-sm bg-[#0F9D58] text-md text-white bg-opacity-75 rounded-md px-4 py-1 hover:bg-opacity-90 "
               onClick={handleSubmit}>
              Submit
              </button>
              <p className="text-[10px] text-red-500">{EmptyData}</p>
              
              </div>
            
            </div>
             
          </div>
          </div>
          
          </div>
          

     );
   }
      export default ResetPassword;
