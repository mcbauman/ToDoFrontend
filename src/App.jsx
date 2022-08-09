import { useEffect, useState } from "react"
import ToDoList from "./ToDoList"
import LogIn from "./LogIn"

export default function App(){
    const [user,setUser]=useState()
    useEffect(()=>{
        console.log("user",user);
    },[user])
    return(
        <>
            {user?<ToDoList setUser={setUser} />:<LogIn setUser={setUser} />}
        </>
    )
}