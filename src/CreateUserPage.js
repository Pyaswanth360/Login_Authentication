import React from "react";
import './custom.css';
import { Outlet } from "react-router-dom";

function CreateUser() {

 

  return (
    <div className="flex h-screen bg-[#f9f4f4] font-roboto">
      
    {/* leftside menu*/}
  
  {/* Right Content */}
  <div className="w-full m-2 flex flex-col space-y-10 ml-[16.66%]  overflow-y-auto">
    
      {/* header row */}
     
      
    {/* Create user container */}
    <Outlet />

    
  </div>
</div>
  );
}

export default CreateUser;