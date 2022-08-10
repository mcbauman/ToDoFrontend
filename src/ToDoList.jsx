import axios from "axios"
import { useEffect, useState } from "react"
import { BiEditAlt, BiAddToQueue } from "react-icons/bi"
import {AiOutlineDelete}from "react-icons/ai"

export default function ToDoList(props){
    const [items,setItems]=useState([])
    function GetItems(){
        axios.get(`https://localhost:7122/Item?id=${props.user}`)
        .then(res=>{
            console.log(res.data)
            setItems(res.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        GetItems();
    },[])
    return (
        <div className="App">
            <header>
                <h1>Your Todo List</h1>
                <button onClick={()=>props.setUser("")}>LOG Out</button>
            </header>
            <main>
                {items.length>0?(
                    items.map(item=>(
                        <section>
                            <div>{item.id}</div>
                            <div>{item.itemName}</div>
                            <div>{item.discription}</div>
                            <input type="Checkbox"/>
                            <button><BiEditAlt/></button>
                            <button><AiOutlineDelete/></button>
                        </section>
                ))
                ):<p>Loading ...</p>}
                <button><BiAddToQueue/></button>
            </main>
        </div>
    )
}