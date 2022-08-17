import axios from "axios"
import { useState } from "react";
import {MdLogin} from "react-icons/md"
import { NavLink } from "react-router-dom";

export default function CreateUser(){
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email,setEmail]=useState("")

    function signUpFunction(e){
        e.preventDefault();
        axios.post(`https://localhost:7122/user/create`,{name,email,password})
        .then ((res)=>{
        })
        .catch(err=>console.log(err))
    }

    return (
        <form id="LogIn" onSubmit={signUpFunction}>
            <h1>Please Sign Up</h1>
            <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="@" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="***" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="Submit"><MdLogin/></button>
            <NavLink to="*">LogIn</NavLink>
        </form>
    )
}