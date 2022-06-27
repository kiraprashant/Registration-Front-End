import React,{useState,useEffect} from 'react'
import axios from "axios"
import {Link ,useNavigate } from "react-router-dom"

function Registration() {

  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
    History("/");
    }

}, []);

  const History = useNavigate ()
  const [userRegistration, setUserRegistration] = useState({
    Name:"",
    Email:"",
    Contact:"",
    Password:"",
  })

  const [Hobbies, setHobbies] = useState([])

  const [Error, setError] = useState("")

 const handleform =(e)=>{
     const Name = e.target.name
     const Value = e.target.value

     setUserRegistration({...userRegistration, [Name]:Value })
 }

 const handleHobbies = (e) =>{
  const {value , checked} = e.target

  if(checked){
    setHobbies([...Hobbies , value])
  }

  else{

    setHobbies(
      Hobbies.filter((elem)=> elem!== value)
    )
  }

 }

 const handlesubmit = ()=>{

  const {Name,Email,Contact,Password} = userRegistration
 
if(Name === "" || Email === "" || Contact === "" || Password === ""){
   setError("Please FIll the Form")
   return 
}

  const url = "http://localhost:5000/"

 axios.post(url,{

  Name:Name,
  Email:Email,
  Contact:Contact,
  Password:Password,
  Hobbies:Hobbies

 }
).then((res)=>{
   

  if(res.status === 201){
    setUserRegistration({
      Name:"",
      Email:"",
      Contact:"",
      Password:""
     })
     setError("")
     History('/Login');
  }
  else {
    if(res.data){
       setError("Email is already Exists")
    }
  }

 }).catch((e)=>{
  console.log(e)
  if(e){
    setError("Email already Exists")
  }
 })

 
 }

  return (
    <>
  <div className='Registration_Container'>
      <div className='Registration'>
        <div className='text-center'>
          <h1 className=''>Registration</h1>
          <hr className='w-100 mx-auto' />
          {Error?<p className="error py-2 font-weight-bold">{Error}</p>:null}
        </div>

        {/* form */}
     <div className="form-group">
          <label >Name : </label>
          <input type="text" 
           className="form-control" 
           name="Name"
           value={userRegistration.Name}
           onChange={handleform}
           />
     </div>

     <div className="form-group">
          <label >Email : </label>
          <input type="text" 
           className="form-control" 
           name="Email"
           value={userRegistration.Email}
           onChange={handleform}
           />
     </div>

     <div className="form-group">
          <label >Contact : </label>
          <input type="text" 
           className="form-control" 
           name="Contact"
           value={userRegistration.Contact}
           onChange={handleform}
           />
     </div>

     <div className="form-group">
          <label >Password : </label>
          <input type="text" 
           className="form-control" 
           name="Password"
           value={userRegistration.Password}
           onChange={handleform}
           />
     </div>

     <div className='hobbie'>
        <p>Hobbies :</p>
        <hr className='w-100 mx-auto' />
        <input type="checkbox" name = "hobbies" onChange={handleHobbies} value = "Cricket" className='mx-1'/> Cricket <br />
        <input type="checkbox" name = "hobbies" onChange={handleHobbies} value = "Football" className='mx-1'/> Football <br />
        <input type="checkbox" name = "hobbies" onChange={handleHobbies} value = "Tennis" className='mx-1'/> Tennis <br />
     </div> 
    <hr className='w-100 mx-auto' />
      <button className='btn btn-warning  w-100 mt-3'onClick={handlesubmit}>Register</button>
      <div className='py-3 text-center'><p>If you have a already a account Click <Link to="/Login">Here </Link> </p></div>
    </div>
 </div>
   </> 
  )
}

export default Registration