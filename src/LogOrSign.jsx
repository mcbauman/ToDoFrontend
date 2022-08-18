import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn"
import CreateUser from "./CreateUser"
import {MdDownloadDone, MdDarkMode, MdLightMode } from "react-icons/md"

export default function LogOrSign(props){
    return(
        <div className={props.theme+" App"}>
            <button className="greenBtn" onClick={()=>props.setTheme(props.theme=="dark"?"light":"dark")}>{props.theme=="dark"?<MdDarkMode/>:<MdLightMode/>}</button>
            <Routes>
                <Route path="*" element={<LogIn user={props.user} setUser={props.setUser} />}/>
                <Route path="CreateUser" element={<CreateUser user={props.user} setUser={props.setUser} />}/>
            </Routes>
        </div>
    )
}