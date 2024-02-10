import * as React from "react";
 import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../custom.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Login() {
     const Navigate = useNavigate();
     const [LoginData, setLoginData] = useState({
      username: "",
      password: "",
      userProfileImage: "",
    });
     const [InvalideEmail,setInvalidEmail]=useState(false);
     const [invalidPassword, setInvalidPassword] = useState(false);
     const [EmptyLoginData, setEmptyLoginData]= useState(false);
     const [UserDetails,setUserDetails]= useState('')
     const [UserNotFound,setUserNotFound]=useState(false);
     const [showPassword, setShowPassword] = useState(false);

     const Login = process.env.REACT_APP_FORE_APILINK + '/user/user-login';
   //This function calls when an event occures in username input field
     const HandleChangeUserName=(event)=>{
   
      setLoginData({
        ...LoginData,
        username: event.target.value,
      })   //Set the login data with the user name 
      setInvalidEmail(false);  // Reset invalidEmail state when email changes
      setEmptyLoginData(false); // Reset Emptylogindata state when email changes
      setUserNotFound(false);
    };
    //This function calls when an event occure in password input field
    const HandleChangePassword=(event)=>{
      
      setLoginData({
        ...LoginData,
        password: event.target.value,
      })  // Set the login data with password 
      setInvalidPassword(false); // Reset invalide password state when password changes 
      setEmptyLoginData(false); // Reset Empty login data state when password changes
      setUserNotFound(false);
    };
  
    // Email validation logic 
    const validateEmail = (email) => {
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidation.test(email);
    };

    // Password validation logic
    const validatePassword = (password) => {
      const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordValidation.test(password);
    };
    /* console.log(new Date());
   console.log(new Date(Date.now() + 3600000)); */
    // This function calls when Sign In button clicked 
    const handleSignin= async()=>{
      // It check the empty Login data submited both email and password
      if (!LoginData.username || !LoginData.password) {
      setEmptyLoginData("Please enter both email and password.");//Error meassage display when inputfield are in empty state
        return;
      }  
      //validation of email and password function are get called 
      else if (!validateEmail(LoginData.username) || !validatePassword(LoginData.password)) {
        // Set the appropriate error states
        setInvalidEmail(!validateEmail(LoginData.username));
        setInvalidPassword(!validatePassword(LoginData.password));
        return;
      }
    
      /* if (!validateEmail(LoginData.UserName) ) {
        setInvalidEmail(true);
         return ;
       
      }
      if (!validatePassword(LoginData.Password)) {
        setInvalidPassword(true);
        return;
      } */

      // All validation are Completed and redy to post the login data  
     else{
      try {
        const res = await fetch(Login, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(LoginData),
        });
      
        if (res.ok) {
          setUserNotFound(false);
          const responseData = await res.json();
          //console.log(responseData);
           localStorage.setItem('LoginData',JSON.stringify(responseData))
          sessionStorage.setItem('userRole',responseData.roleID);
          sessionStorage.setItem('token',responseData.token);
          sessionStorage.setItem('userData', JSON.stringify(responseData));
        // If responce ok it check the status of the user he loged initially 
          if (responseData.forcePasswordChange===true) {
            console.log(responseData.forcePasswordChange);
            Navigate('/ResetPassword', { state: { LoginData: responseData } });//Navigate to ResetPassword page 
          }
          //If he alredy reset the password it check the role of the use he is an admin are user
          else if (responseData.roleID === 1) {
            //console.log('he/she is admin');

            Navigate('/CreateUser', { state: { LoginData: responseData } }); // if he is admin navigate to AdminDashbordPage
          } else if(responseData.roleID === 2) {
            Navigate('/CreateUser', { state: { LoginData: responseData } });//if he is use navigate to UserHomePage
          }
          //if login detalails are incorrect then display an error message
        } else {
          setUserNotFound('Login with registerd email and password');
        }
        //when error occured during login  then enterd to catch 
      } catch (error) {
        console.error('An error occurred during login:', error);
      }

     } 
 
    }; 
    //This function calls when ForegetPassword link clicked 
    const HandleForgotPassword=async()=>{
      Navigate('/ForgotPassword')     //Navigate to ForgotPassword Page
    }
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

  
    
/*  
    const UserData= {
      firstName: "veeragani", 
      lastName: "venkata Ramana",
      mobileNo: "6304059302",
      email: "venkat162m@gmail.com",
      roleId:1
    };
    const createUser= async()=>{
      try{
        const res = await fetch('http://localhost:3050/measurit/admin/create-user', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(UserData),
        });
      }catch(error){
        console.log('failed to fetch data');
      }

    }; */

    return (
      <div className="flex-col justify-center items-center h-screen font-roboto bg-[#f9f4f4]  ">
        
     
     <div className="w-full h-1/7  border-b-[1px] border-black-500 bg-[#959BB0] bg-opacity-10 text-[28px] px-4">
        <div className="w-full flex space-x-2 justify-between h-auto ">
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[50px]"/>
        <div className="bg-black bg-opacity-20 w-[2px] h-[30px]"/>
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
          <p className="mb-0 ">MEASURIT</p>
        </div>     
   </div>   

  <div className="flex justify-center bg-[#f9f4f4]">
  <div className="flex justify-center mt-[80px] lg:mt-[100px] md:mt-[150px] 2xl:mt-[150px] items-center">
    <div className="flex-col flex self-center items-center bg-[#959BB0] bg-opacity-[15%] rounded-sm p-4">
     
      <p className="text-2xl pt-4">Login</p>
   
      <div className="p-6 relative">
      <div className="flex-col justify-center flex items-center space-y-2 mt-2">
      <p className="text-md">User Name </p>
  <div className="flex-row flex items-center space-x-2 pl-2 pr-2 relative">
  <span className="flex justify-center items-center absolute left-5">
      <FontAwesomeIcon icon={faUser} className="text-gray-400" />
      <div className="ml-1 mr-4 flex-grow border-r border-gray-300 h-6"></div>
    </span>
    
    <input
      className="w-5/6 md:w-full rounded-sm focus:outline-none focus:ring-[2px] focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-sm px-2 py-1 pr-2 pl-8 text-[12px] placeholder-text-xs placeholder-text-center"
      placeholder="Enter your Email"
      value={LoginData.username}
      onChange={HandleChangeUserName}
    />
    
  </div>
  {InvalideEmail && (
    <div className="text-red-400 text-[12px]">
      <p className="flex justify-center">Enter the correct Email</p>
    </div>
  )}

  <p className="text-md">Password</p>

  <div className="flex-row flex items-center space-x-2 relative pl-2 pr-2">
  <span
      className="flex justify-center items-center absolute left-5"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <FaEye className="text-sm text-center text-gray-400 cursor-pointer"></FaEye>
        
      ) : (
        <FaEyeSlash className="text-sm text-gray-400 cursor-pointer" />
      )}
      <div className="ml-1 mr-4 flex-grow border-r border-gray-300 h-6"></div>
    </span>
    <input
      type={showPassword ? "text" : "password"}
      className="w-5/6 md:w-full rounded-sm focus:outline-none focus:ring-[2px] focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-sm px-2 py-1 pr-2 pl-8 text-[12px] placeholder-text-xs placeholder-text-center"
      placeholder="Enter your password"
      value={LoginData.password}
      onChange={HandleChangePassword}
    />
    
  </div>

  {invalidPassword && (
    <div className="text-red-400 text-[12px]">
      <p>Password is incorrect</p>
    </div>
  )}
</div>


        <div className="flex justify-center items-center mt-6">
          <p
            className="underline text-[#2158E5] hover:text-blue-800 cursor-pointer text-[14px]"
            onClick={HandleForgotPassword}
          >
            Forgot Password
          </p>
          </div>
        <div className="flex justify-center items-center mt-6">
        <button
            className="bg-[#0F9D58] text-md text-white bg-opacity-75 rounded-md px-4 py-1 hover:bg-opacity-90 mb-4"
            onClick={handleSignin}
          >
            Sign In
          </button>
          </div>
        <div className="pt-3">
          <p className="text-red-400 text-[12px]">
            {EmptyLoginData}
            {UserNotFound}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


   
      
      {UserDetails ? (
        <Link to={{ pathname: "/ResetPassword", state: {UserDetails } }}>
          
        </Link>
      ) : (
        <p></p>
      )} 
     
    
    </div>
    

      );
}
export default Login;
