import axios from "axios"
import { NavLink } from "react-router-dom";
import { useState } from "react"
import {MdLogin} from "react-icons/md"


export default function LogIn(props){
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    function loginFunction(e){
        e.preventDefault();
        console.log("loginFunctionExec");
        axios.get(`https://localhost:7122/signin?name=${name}&password=${password}`)
        .then ((res)=>{
            if(res.data!="Password missmatch"){
                props.setUser(res.data)
            }
            console.log(res)
        })
        .catch(err=>console.log(err))
    }
    return (
        <form id="LogIn" onSubmit={loginFunction}>
            <h1>Please Log In</h1>
            <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)} />
            <input type="password" placeholder="***" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="Submit"><MdLogin/></button>
            <NavLink to="CreateUser">SignUp</NavLink>
        </form>
    )
}