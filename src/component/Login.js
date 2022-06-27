import React,{ useState,useEffect } from "react"
import Axios from "axios"
import {Link,useNavigate} from "react-router-dom"


function Login() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
    History("/");
    }

}, []);

    const History = useNavigate ()
    const [UserLogin, setUserLogin] = useState({
        Email:"",
        Password:""
    })

    const [Error, setError] = useState("")

    const handleform = (e) =>{
     const Name = e.target.name
     const Value = e.target.value

     setUserLogin({...UserLogin ,[Name]:Value} )
    }
    const handlesubmit = () =>{

        const {Email,Password} = UserLogin

 
        const url = "http://localhost:5000/login"
        Axios.post(url,{
            Email:Email,
            Password:Password,
           }).then((res)=>{
        console.log(res)
        localStorage.setItem('token', res.data.token);
        History("/")
        }).catch((e)=>{
            console.log(e)
           if(e.response.data.message === "invalid Email or password"){
                 setError("invalid Email or password")
           }
        })
      
    }
  return (
    
        <>
      <div className='Registration_Container'>
          <div className='Registration'>
            <div className='text-center'>
              <h1 className=''>Login</h1>
              <hr className='w-100 mx-auto' />
              {Error?<p className="error py-2 font-weight-bold">invalid Email or Password</p>:null}
                
            </div>
    
            {/* form */}

    
         <div className="form-group">
              <label >Email : </label>
              <input type="text" 
               className="form-control" 
               name="Email"
               value={UserLogin.Email}
               onChange={handleform}
               />
         </div>
    
    
         <div className="form-group">
              <label >Password : </label>
              <input type="text" 
               className="form-control" 
               name="Password"
               value={UserLogin.Password}
               onChange={handleform}
               />
         </div>
         <hr className='w-100 mt-4 mx-auto' />
         <button className='btn btn-warning  w-100 mt-3'onClick={handlesubmit}>Login</button>
         <div className='py-3 text-center'><p>Dont Have account <Link to="/Register">Create Now </Link> </p></div>
        </div>
    </div> 
   </> 
  )
}

export default Login