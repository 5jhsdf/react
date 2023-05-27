import {Routes,Route,Navigate} from "react-router-dom";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login.JSx";
export default function Index(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}>  </Route>         
                <Route path="/logim" element={<Login/>}>  </Route>         
            </Routes>
        </div>
    )
}