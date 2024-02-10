import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function CreateUserContainer() {
    const Navigate=useNavigate();

    const [RoleId,setRoleId]=useState();
    const [file,setUserImageFile]=useState(null)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [errors, setErrors] = useState({});
    const[EmptyUserData, setEmptyUserData]= useState(false);
    const [InvalidEmail, setInvalidEmail ]= useState(false);
    const [InvalidUserName,setInvalidUserName]=useState(false);
    const [InvalidFirstName,setInvalidFirstName] = useState(false);
    const [InvalidLastName,setInvalidLastName]=useState(false);
    const [InvalidMobileNumber,setInvalidMobileNumber]=useState(false);
   const [EmptyRoleid,setEmptyRoleid]=useState(false);
   const [checkUserCreated,setcheckUserCreated]=useState(false);
   const [userProfileImage, setuserProfileImage] = useState();

   const CreateUser = process.env.REACT_APP_FORE_APILINK + '/admin/create-user';

   
   useEffect(()=>{
     const storedLoginData = JSON.parse(localStorage.getItem('LoginData'))||null;
     const Userdata =JSON.parse(sessionStorage.getItem('userData'))||null;
     if(storedLoginData&&Userdata){
       if(storedLoginData.token===Userdata.token){
       console.log('profile matched')
       }else{
         console.log('logout')
        Navigate('/')
        sessionStorage.removeItem('userRole');
           sessionStorage.removeItem('token');
           sessionStorage.removeItem('userData');
       }
     }else{
       Navigate('/')
         sessionStorage.removeItem('userRole');
           sessionStorage.removeItem('token');
           sessionStorage.removeItem('userData');
     }
   })

    const handleInputChange = (field, value) => {
     // console.log(`Updating ${field} to:`, value);
    
      if (field === "firstName") {
        setInvalidFirstName(false);
        setFirstName(value);
      } else if (field === "lastName") {
        setInvalidLastName(false);
        setLastName(value);
      } else if (field === "username") {
        setInvalidUserName(false);
        setUserName(value);
        console.log("New username state:", username);
      } else if (field === "mobileNo") {
        if(!isNaN(value)){
          setInvalidMobileNumber(false);
          setMobileNo(value.slice(0, 10));
        } 
      } else if (field === "email") {
        setInvalidEmail(false);
        setEmail(value);
      }
    };


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  setUploadedImage(URL.createObjectURL(file));
  setUserImageFile(file);
};

const validateEmail =  (email) => {
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailValidation.test(email);
};
const validateUserName=(username)=>{
  const UserNameValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return UserNameValidation.test(username);
}

const validatefirstName= (firstName)=> {
  // Regular expression to check if the name contains only letters
  const FirstNamevalidation = /^[A-Za-z]+$/;

  // Test the name against the regular expression
  return FirstNamevalidation.test(firstName);
}

const validatelastName=(LastName)=> {
  // Regular expression to check if the name contains only letters
  const LastNameValidation = /^[A-Za-z]+$/;

  // Test the name against the regular expression
  return LastNameValidation.test(LastName);
}

const validateMobileNumber= (mobileNumber)=> {
  // Regular expression to check if the mobile number contains exactly 10 digits
  const mobileNumberValidation = /^\d{10}$/;

  // Test the mobile number against the regular expression
  return mobileNumberValidation.test(mobileNumber);
}

 
const roleidvalidation=(roleId)=>{
if(!roleId){
  setEmptyRoleid('please select the role ')
}else{
  return true
}
}
const handleCreateUser = async () => {
  console.log('enterd to create')
  
    if (!firstName || !lastName || !username || !mobileNo || !email ) {
      setEmptyUserData("Please fill all input fields.");
      console.log('enterd to empty')
      return;
    } else if(!validateEmail(email) || !validateUserName(username)|| !validatefirstName(firstName)|| !validatelastName(lastName)|| !validateMobileNumber(mobileNo) ||!roleidvalidation(RoleId) ){
     
      setEmptyUserData(false)
      setInvalidEmail(!validateEmail(email));
      setInvalidUserName(!validateUserName(username));
      setInvalidFirstName(!validatefirstName(firstName));
      setInvalidLastName(!validatelastName(lastName));
      setInvalidMobileNumber(!validateMobileNumber(mobileNo));
      return;
    }else{
      setEmptyUserData(false)
      setInvalidEmail(false);
      setInvalidUserName(false);
      setInvalidFirstName(false);
      setInvalidLastName(false);
      setInvalidMobileNumber(false);
      fetchCreateUser();
    };
    
 
    // Proceed with user creation logic here
  };

  const fetchCreateUser = async () => {
    try {
      console.log(RoleId);
      console.log(file);
      const token = sessionStorage.getItem('token');
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('username', username);
      formData.append('mobileNo', mobileNo);
      formData.append('email', email);
      formData.append('roleId', RoleId);
      formData.append('file', file);
  
      console.log(formData);
  
      const response = await fetch(CreateUser, {
        method: 'POST',
        headers: {
          'x-token': token,
        },
        body: formData,
      });
  
      const responseData = await response.json(); // Assuming response is JSON, adjust accordingly
  
      if (response.ok) {
        console.log('User created successfully:', responseData);
        setcheckUserCreated(true);
      } else {
        console.error('Failed to create user:', responseData);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  
 const  handleOkUserCreated=async()=>{
  setcheckUserCreated(false);
  Navigate("/Measurit/AdminHome");
 };
 
 const handleLogout = async () => {
  
  localStorage.removeItem('LoginData');

 sessionStorage.clear(); 
  const loginPageUrl = '/';
    // Push multiple states to the history to prevent going back to the homepage
    if (window.history && window.history.pushState) {
      for (let i = 0; i < 140; i++) {
        window.history.pushState({}, document.title, loginPageUrl);
      }
      window.addEventListener('popstate', function (event) {
        if (event.state === null) {
          for (let i = 0; i < 140; i++) {
            window.history.pushState({}, document.title, loginPageUrl);
          }
        }
      });
    }
    // Redirect the user to the login page
    window.location.replace(loginPageUrl);
  };

return(

<div>

{checkUserCreated && (
  <div className="fixed inset-0 z-10 flex items-center justify-center">
  {/* Background overlay (blurred) */}
  <div className="absolute inset-0 bg-black opacity-30 "></div>

  <div className="bg-white p-4 rounded-md shadow-md relative z-10 flex flex-col items-center justify-center">
  <p className="text-lg font-bold mb-2">
        User Created successfully!!.
        
      </p>
      <button className="items-center justify-center text-white bg-green-600 hover:bg-green-700 py-1 px-2 rounded-md mt-4" onClick={handleOkUserCreated}>
        OK
      </button>
    </div>
  </div>
)}

{/* Content */}
<div className=" flex justify-center  ">
{/* Your main content goes here */}

<div className="bg-[#959BB0] bg-opacity-[15%]   w-1/3  flex-col mt-4 px-10 py-2  rounded-md sm:w-2/3 md:w-1/3  max-md:px-3">
{/* Profile Image */}

<div className=" flex items-center justify-center  flex-grow ">
{uploadedImage ? (
<div className="relative">
<img
  src={uploadedImage}
  alt="Uploaded Profile"
  className="w-20 h-20 object-cover rounded-full border-4 border-white"
/>
<label
  htmlFor="imageUpload"
  className="absolute top-14 right-1 text-blue-500 text-sm underline hover:text-blue-900 cursor-pointer"
>
  {/* Upload Image Icon */}
  <FontAwesomeIcon  icon={faCamera} />
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleImageUpload}
  />
</label>
</div>
) : (
<label htmlFor="imageUpload" className="cursor-pointer">
<span className="hover:text-gray-700 text-gray-500 text-4xl ">
  <FontAwesomeIcon className="" icon={faImage} />
</span>
<input
  id="imageUpload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleImageUpload}
/>
</label>
)}
</div>
<div className="flex flex-col space-y-3  flex-grow ">

  <div className="">
  {/* First Name */}
  <label className="text-gray-600 text-sm mb-1 block">First Name</label>
  <input
    type="text"
    className={`border bg-white w-full rounded-sm ${
      errors.firstName ? "border-red-500" : ""
    } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-2 pr-2 placeholder-text-xs placeholder-text-left`}
    placeholder="Enter your First Name"
    value={firstName}
    onChange={(e) => handleInputChange("firstName", e.target.value)}
  />
 
</div>
{InvalidFirstName&&(
 <p className="text-red-500 text-[10px]">Enter the correct first name</p>
  )}


<div className="" >
  {/* Last Name */}
  <label className="text-gray-600 text-sm mb-1 block">Last Name</label>
  <input
    type="text"
    className={`border bg-white w-full rounded-sm ${
      errors.lastName ? "border-red-500" : ""
    } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-2 pr-2 placeholder-text-xs placeholder-text-left`}
    placeholder="Enter your Last Name"
    value={lastName}
    onChange={(e) => handleInputChange("lastName", e.target.value)}
  />
</div>
{InvalidLastName&&(
<p className="text-red-500 text-[10px]">Enter the correct last name</p>
 )}




{/* User Name */}
<div className="" >
<label className="text-gray-600 text-sm mb-1 block">User Name</label>
<input
type="text"
name="username"
className={`border bg-white w-full rounded-sm ${
  errors.username ? "border-red-500" : ""
} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-2 pr-2 placeholder-text-xs placeholder-text-left`}
placeholder="Enter your User Name"
value={username}
onChange={(e) => handleInputChange("username", e.target.value)}
/>

</div>
{InvalidUserName&&(
<p className="text-red-500 text-[10px] ">Enter the correct userName</p>
)}


{/* Mobile No */}
<div className="" >
<label className="text-gray-600 text-sm mb-1 block">Mobile No</label>
<input

pattern="[0-9]{10}"
className={`border bg-white w-full rounded-sm ${
  errors.mobileNo ? "border-red-500" : ""
} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-2 pr-2 placeholder-text-xs placeholder-text-left`}
placeholder="Enter your mobile Number"
value={mobileNo}
onChange={(e) => handleInputChange("mobileNo", e.target.value)}
/>


</div>
{InvalidMobileNumber&&(
<p className="text-red-500 text-[10px]">Enter a valid 10-digit mobile number</p>
)} 

{/* Email */}
<div className="" >
<label className="text-gray-600 text-sm mb-1 block">Email</label>
<input
type="email"
pattern="[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
className={`border bg-white w-full rounded-sm ${
  errors.email ? "border-red-500" : ""
} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-2 pr-2 placeholder-text-xs placeholder-text-left`}
placeholder="Enter your Email"
value={email}
onChange={(e) => handleInputChange("email", e.target.value)}
/>


</div>
{InvalidEmail&&(

<p className="text-red-500 text-[10px] ">Enter the correct Email</p>
) }
<div className="" >
<label className="text-gray-600 text-sm mb-1 block">Role</label>
<select
  className={`border bg-white w-full rounded-sm ${
    errors.role ? "border-red-500" : ""
  } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 text-gray-600 text-[16px] py-1 pl-1 pr-2`}
  value={RoleId}
  onChange={(e) => {
    const selectedRoleId = parseInt(e.target.value, 10);
    setRoleId(isNaN(selectedRoleId) ? '' : selectedRoleId);
    setEmptyRoleid(false);
  }}
>
<option value="" className="focus:text-[#959BB0] focus:bg-opacity-15 !bg-transparent">Select Role</option>
  <option value={1}>Admin</option>
  <option value={2}>User</option>
</select>


</div>
<p className="text-red-500 text-[10px]">{EmptyRoleid}</p>

</div>
<p className="text-red-400 text-[14px] flex justify-center">{EmptyUserData}</p>
{/* Change Password Link */}
<div className="flex flex-col space-y-4 p-2">


{/* Update Button */}
<div className="flex justify-center mt-2">
            <button
              className="text-white text-opacity-100 text-base whitespace-nowrap bg-green-600 hover:bg-green-700 justify-center items-center px-6 py-1 rounded-md self-center max-md:px-5 transition-colors duration-300"
              type="button"
  onClick={handleCreateUser}
>
  Create
</button>

</div>
 {/* Logout */}
 <div className="p-4 hover:bg-[#f9f4f4]">
      <div className="ml-2 flex items-left">
        <a
          onClick={handleLogout}
          className={`flex items-center text-md cursor-pointer 
            `}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <span className="text-sm hidden sm:inline">Logout</span>
        </a>
      </div>
    </div>
</div>

</div>



</div>
</div>
)
}
export default CreateUserContainer;