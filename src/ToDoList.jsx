import axios from "axios"
import { useEffect, useState } from "react"
import { BiEditAlt, BiAddToQueue } from "react-icons/bi"
import {MdDownloadDone, MdDarkMode, MdLightMode } from "react-icons/md"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {AiOutlineDelete}from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi" 
import e from "cors"

export default function ToDoList(props){
    const [items,setItems]=useState([])
    const [show, setShow]=useState(false)
    const [show2, setShow2]=useState(false)
    const [ItemName, setTaksName]=useState()
    const [Discription, setTaskDesc]=useState()

    function GetItems(){
        const header = { Authorization: `Bearer ${props.user}` };
        const data = {}
        axios.post(`https://localhost:7122/getItems`,data,{headers:header})
        .then(res=>{
            setItems(res.data)
        })
        .catch(err=>console.log(err))
    }

    function StoreNewTask(e){
        e.preventDefault();
        const headers = { Authorization: `Bearer ${props.user}` };
        const data = {ItemName,Discription}
        console.log(headers);
        console.log(data);
        axios.post("https://localhost:7122/Item",data,{headers:headers})
        .then(res=>{
            GetItems();
            setTaksName()
            setTaskDesc()
            setShow(false)
        })
        .catch(err=>console.log(err))
    }

    function removeItem(id,itemName,discription){
        const headers = { Authorization: `Bearer ${props.user}` };
        const data={id,itemName,discription}
        console.log(data);
        axios.delete("https://localhost:7122/Item",{headers:headers,data:data})
        .then(res=>{
            GetItems();
        })
        .catch(err=>console.log(err))
    }
//Update Item
    function updateItem(id){
        const data={id, ItemName, Discription}
        const headers = { Authorization: `Bearer ${props.user}` };
        axios.put("https://localhost:7122/Item",data,{headers:headers})
        .then(res=>{
            GetItems();
            setShow2(false);
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        GetItems();
    },[])
    return (
        <div className={props.theme+" App"}>
            <header>
                <button className="greenBtn" onClick={()=>props.setTheme(props.theme=="dark"?"light":"dark")}>
                    {props.theme=="dark"?<MdDarkMode/>:<MdLightMode/>}
                </button>
                <h1>Your Todo List</h1>
                <button onClick={()=>props.setUser("")}>LOG Out</button>
            </header>
            <main>
                {items.length>0?(
                    items.map(item=>(
                        <section key={item.id}>
                            <div className={show2?"enrolled specialDib":"specialDiv"}>
                                {show2!=item.id?(
//List-Item
                                (<div>
                                    <div>
                                    <input type="Checkbox"/>
                                    <div>{item.id}</div>
                                    <div className="bold">{item.itemName}</div>
                                </div>
                                <div>{item.discription}</div>
                                <div className="btndiv">
                                    <button className="yellowBtn" onClick={()=>setShow2(item.id)}><BiEditAlt/></button>
                                    <button onClick={()=>removeItem(item.id,item.itemName,item.discription)}><AiOutlineDelete/></button>
                                </div>
                                </div>)
                                ):
// Update ITEM
                                <form onSubmit={(e)=>{updateItem(item.id); e.preventDefault()}}>
                                    <input className="input30" type="text" placeholder={item.itemName} onChange={e=>setTaksName(e.target.value)}/>
                                    <input className="input70" type="text" placeholder={item.discription} onChange={e=>setTaskDesc(e.target.value)}/>
                                    <div className="btndiv">
                                        <button className="greenBtn" type="submit"><GiConfirmed/></button>
                                        <button onClick={()=>setShow2(false)}><AiOutlineCloseCircle/></button>
                                    </div>
                                </form>
                                }
                            </div>
                            {/* <button ><BiEditAlt/></button> */}
                        </section>
                ))
                ):<p>Loading ...</p>}
                {show?(
//New Task
                    <form className="newTask" onSubmit={StoreNewTask}>
                        <input className="input30" type="text" placeholder="Task-Name" onChange={e=>setTaksName(e.target.value)} />
                        <input className="input70" type="text" placeholder="Task-Description" onChange={e=>setTaskDesc(e.target.value)} />
                        <div className="btndiv">
                            <button type="submit" className="greenBtn"><MdDownloadDone/></button>
                            <button onClick={()=>setShow(false)}><AiOutlineCloseCircle/></button>
                        </div>
                    </form>
                ):<button className="greenBtn" onClick={()=>setShow(true)}><BiAddToQueue/></button>}
            </main>
        </div>
    )
}