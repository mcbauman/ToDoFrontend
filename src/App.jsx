import { useEffect, useState } from "react"
import ToDoList from "./ToDoList"
import LogOrSign from "./LogOrSign"

import LogIn from "./LogIn"
import CreateUser from "./CreateUser"

export default function App(){
    const [user,setUser]=useState()
    useEffect(()=>{
        console.log("user",user);
    },[user])
    return(
        <>
            {user?<ToDoList user={user} setUser={setUser} />:<LogOrSign user={user} setUser={setUser} />}
        </>
    )
}