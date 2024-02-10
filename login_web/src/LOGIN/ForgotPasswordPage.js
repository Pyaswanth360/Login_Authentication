import * as React from "react";
 import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../custom.css'; 

function ForgotPassword () {
     const Navigate = useNavigate();
     const [email ,setemail]=useState();
     const [Emptyemail,setEmptyemail]=useState(false);
     const [InvalidEmail,setInvalidEmail]=useState(false);
     const [checkEmailAllert,setcheckEmailAllert]=useState(false);
     const [UnregisterdEmail,setUnregisterdEmail]=useState(false);
     
     const ForgotPassword = process.env.REACT_APP_FORE_APILINK + '/user/user-forgot-password';

     //This function calls when an onchnge event occures in email input field 
    const HandlechangeEmail= async(event)=>{
     const emailEnterd= event.target.value
     setemail(emailEnterd);
     setInvalidEmail(false);
     setEmptyemail(false);
     setUnregisterdEmail(false);
    }; 
    //This function calls when submit button clicked 
    const  handlesubmitEmail=async()=>{
   //It check the email is in empty or not 
      if (!email) {
        setEmptyemail("Please enter your email.");//when email have an empty data 
          return;
      }else if(!validateEmail(email)){
        setInvalidEmail('Enter a valid Email');
      }else {
        const Email={
        email:email
        }
        try {
          const res = await fetch(ForgotPassword, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Email),
          });
          if(res.ok){
         setcheckEmailAllert(true);
         setUnregisterdEmail(false);
          }else{
            setUnregisterdEmail('Email you entred is not registerd');
          }
        }catch(error){
          console.log('An error occurred during email submit')
        }
      }
      
      
    };

    const validateEmail = async (email) => {
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidation.test(email);
    };

    const handleResetPasswordAlert= async()=>{
      setcheckEmailAllert(false);
      Navigate('/');
    }
    
    return (
      <div className="flex-col justify-center items-center h-screen font-roboto bg-[#f9f4f4] ">
    {checkEmailAllert && (
  <div className="fixed inset-0 flex h-1/5 mt-3 justify-center z-25">
    <div className="bg-white p-4 h-auto rounded shadow-md flex items-center flex-col ">
      <p className="text-center text-md">
        Reset password link has been sent  to your registered Email.
        <br/> Kindly check your Email Inbox.
      </p>
      <button className="mt-4 bg-[#0F9D58] bg-opacity-75 text-white  px-4 py-1 rounded " onClick={handleResetPasswordAlert}>
        OK
      </button>
    </div>
  </div>
)}

     <div className="w-full h-1/7  border-b-[1px] border-black-500 bg-[#959BB0] bg-opacity-10 text-[28px] px-4">
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
    <p className="mb-0 ">FORGOT PASSWORD</p>
  </div>     
    </div>   

    <div className="flex justify-center h-4/3  pt-[80px] ">
    <div className="  p-4 flex justify-center h-auto  bg-[#959BB0] bg-opacity-[15%] rounded-sm  " >
   
      <div className=" flex-col   flex items-center  p-1   ">
      <p className="text-xl  ">Forgot Password?</p> 
      <div className=" flex-col flex items-center space-y-3 mt-6 p-2 ">
      <p className="text-[14px] ">Enter the email address you used when you joined <br/>and we’ll  send you instructions to reset your password </p>
      <div className="w-3/4 mt-8 ">
      <input className=" w-full rounded-sm   focus:outline-none  focus:ring-[2px] 
      focus:ring-gray-500 focus:ring-opacity-30   
      text-gray-600 text-sm px-2 py-1 text-[12px] 
      placeholder-text-sm placeholder-text-center "
       placeholder="Enter your Email" value={email} onChange={HandlechangeEmail}>
      </input>
      </div>
      <div className="mt-12">
         <button className=" bg-[#0F9D58] text-md text-white bg-opacity-75 rounded-md px-4 py-1 hover:bg-opacity-90 " onClick={handlesubmitEmail}>
        Submit
        </button>
        <p className="text-[12px] text-red-500">{Emptyemail}{InvalidEmail} {UnregisterdEmail}</p>
        </div>

        
         </div>
      </div>
      
    </div>
    </div>
    
    </div>
    

      );
}
export default ForgotPassword;
