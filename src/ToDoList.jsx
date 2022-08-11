import axios from "axios"
import { useEffect, useState } from "react"
import { BiEditAlt, BiAddToQueue } from "react-icons/bi"
import {MdDownloadDone} from "react-icons/md"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {AiOutlineDelete}from "react-icons/ai"

export default function ToDoList(props){
    const [items,setItems]=useState([])
    const [show, setShow]=useState(false)
    const [ItemName, setTaksName]=useState()
    const [Discription, setTaskDesc]=useState()

    function GetItems(){
        axios.get(`https://localhost:7122/Item?id=${props.user}`)
        .then(res=>{
            console.log(res.data)
            setItems(res.data)
        })
        .catch(err=>console.log(err))
    }

    function StoreNewTask(e){
        e.preventDefault();
        axios.post("https://localhost:7122/Item",{UserId:props.user,ItemName,Discription})
        .then(res=>{
            console.log(res.data)
            GetItems();
            setTaksName()
            setTaskDesc()
            setShow(false)
        })
        .catch(err=>console.log(err))
    }

    function removeItem(id,itemName,discription){
        let removeBody={UserId:props.user,id,itemName,discription}
        console.log("{id,itemName,discription}",removeBody);
        axios.delete("https://localhost:7122/Item",{data:removeBody})
        .then(res=>{
            console.log({id,itemName,discription,UserId:props.user})
            console.log("DELETE RESPONSE",res)
            GetItems();
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
                            <input type="Checkbox"/>
                            <div>{item.id}</div>
                            <div>{item.itemName}</div>
                            <div>{item.discription}</div>
                            <button ><BiEditAlt/></button>
                            <button onClick={()=>removeItem(item.id,item.itemName,item.discription)}><AiOutlineDelete/></button>
                        </section>
                ))
                ):<p>Loading ...</p>}
                {show?(
                    <form onSubmit={StoreNewTask}>
                        <input type="text" placeholder="Task-Name" onChange={e=>setTaksName(e.target.value)} />
                        <input type="text" placeholder="Task-Description" onChange={e=>setTaskDesc(e.target.value)} />
                        <button type="submit"><MdDownloadDone/></button>
                        <button onClick={()=>setShow(false)}><AiOutlineCloseCircle/></button>
                    </form>
                ):<button onClick={()=>setShow(true)}><BiAddToQueue/></button>}
            </main>
        </div>
    )
}