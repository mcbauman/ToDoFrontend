import axios from "axios"
import { useEffect, useState } from "react"

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
        <div>
            <button onClick={()=>props.setUser("")}>LOG Out</button>
            HELLO FROM TODILIST
            {items.length>0?(
                items.map(item=>(
                    <section>
                        <div>{item.Id}</div>
                        <div>{item.Name}</div>
                        <div>{item.discription}</div>
                        <input type="Checkbox"/>
                        <button>Change Entry</button>
                        <button>Delete Entry</button>
                    </section>
            ))
            ):<p>Loading ...</p>}
        </div>
    )
}