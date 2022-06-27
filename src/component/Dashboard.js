import React,{useEffect,useState} from 'react'
import {Link,useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
    const History = useNavigate ()
    const token = localStorage.getItem('token');
    const [data, setdata] = useState([])
    const [Email, setEmail] = useState()
    let Hobbies = []
 
    
    useEffect(() => {
        if(!token){
        History('/login');
        }

    }, []);

    

    useEffect(() => {
    
      const dataapi = async() =>{    
  const url = "http://localhost:5000/"
 
 const res =  await axios.get(url,{
    headers:{
      "x-access-token":token
    }

  })
  setdata(res.data.data)
  setEmail(res.data.MyEmail)

}

dataapi()

// axios.get(url,{
//   headers:{
//           "x-access-token":token
//         }
// }).then((res)=>{
//   setdata(res.data.data)
 
// }).catch((e)=>{

// })

  }, []);

    
  return (
    <>  
      
        <div  className="d-flex bg-dark text-white Dashboard_Nav px-3">
        <p className="">Logo</p>
         <div className='d-flex'>
          <p className='px-3'>welcome {Email}</p>
          <Link to="/Logout"> <p className='px-3 text-danger'>logout</p> </Link>
         </div>
        </div>
        <div className='container py-5'>
          <table className='table table-bordered'>
          <thead className='thead-dark'>
             <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Hobbies</th>
             </tr>
             </thead>  
             <tfoot>
                  {data.map((elem,i)=>{
                    Hobbies = elem.Hobbies
                    return(
                     <tr key = {i}>
                         <td>{i+1}</td>
                         <td>{elem.Name}</td>
                         <td>{elem.Email}</td>
                         <td>
                            
                          
                            {elem.Hobbies.length > 0 ? <span>
                             {Hobbies.toString()}
                            </span>:<span>N/A</span>}


                         </td>
                     </tr>
                    )
                  })}
             </tfoot>
          </table>
        </div>
    </>
  )
}

export default Dashboard