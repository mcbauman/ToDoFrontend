import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn"
import CreateUser from "./CreateUser"
import {MdDownloadDone, MdDarkMode, MdLightMode } from "react-icons/md"

export default function LogOrSign(props){
    return(
        <div className={props.theme+" App"}>
            <select value={props.theme} onChange={e=>props.setTheme(e.target.value)}>
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                    <option value="dark2">dark2</option>
                    <option value="light2">light2</option>
                </select>
            <Routes>
                <Route path="*" element={<LogIn user={props.user} 
                setUser={props.setUser} theme={props.theme} 
                setTheme={props.setTheme}/>}/>
                <Route path="CreateUser" element={<CreateUser 
                user={props.user} setUser={props.setUser} theme={props.theme} 
                setTheme={props.setTheme}/>}/>
            </Routes>
        </div>
    )
}