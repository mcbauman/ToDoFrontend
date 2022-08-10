import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn"
import CreateUser from "./CreateUser"

export default function LogOrSign(props){
    return(
        <>
            <Routes>
                <Route path="*" element={<LogIn user={props.user} setUser={props.setUser} />}/>
                <Route path="CreateUser" element={<CreateUser user={props.user} setUser={props.setUser} />}/>
            </Routes>
        </>
    )
}