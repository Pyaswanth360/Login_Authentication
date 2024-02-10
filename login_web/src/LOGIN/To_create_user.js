const UserData= {
    firstName: "veeragani", 
    lastName: "venkata Ramana",
    mobileNo: "6304059302",
    email: "venkat162m@gmail.com",
    roleId:1
  };
  const createUser= async()=>{
    try{
      const res = await fetch('http://localhost:3050/admin/create-user', {
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

  }; 