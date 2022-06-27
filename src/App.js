import './App.css';
import Registration from './component/Registration';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Logout from './component/Logout';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element = {<Dashboard/>}/>
          <Route path="/logout" element = {<Logout/>}/>
          <Route path="/Login" element = {<Login/>}/>
          <Route excate path="/Register" element = {<Registration/>} />
          
        </Routes>
    </div>
  );
}

export default App;
