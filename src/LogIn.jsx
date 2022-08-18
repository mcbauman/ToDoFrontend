import axios from "axios"
import { NavLink } from "react-router-dom";
import { useState } from "react"
import {MdLogin} from "react-icons/md"


export default function LogIn(props){
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    function loginFunction(e){
        e.preventDefault();
        axios.post(`https://localhost:7122/login`,{name,password})
        .then ((res)=>{
            if(res.data!="Password missmatch"){
                props.setUser(res.data)
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <form id="LogIn" onSubmit={loginFunction}>
            <h1>Please Log In</h1>
            <input type="text" className="yellowBtn" placeholder="name" onChange={(e)=>setName(e.target.value)} />
            <input type="password" className="yellowBtn" placeholder="***" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="greenBtn" type="Submit"><MdLogin/></button>
            <NavLink to="CreateUser">SignUp</NavLink>
        </form>
    )
}