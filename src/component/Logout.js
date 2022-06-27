import React , {useEffect} from 'react'
import {useNavigate } from "react-router-dom"

function Logout() {
    const History = useNavigate()

    useEffect(() => {
        localStorage.clear();
        History("/")
       
    }, []);

  return (
    <div></div>
  )
}

export default Logout