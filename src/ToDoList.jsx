import axios from "axios"
import { useEffect, useState } from "react"
import { BiEditAlt, BiAddToQueue } from "react-icons/bi"
import {MdDownloadDone, MdDarkMode, MdLightMode } from "react-icons/md"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {AiOutlineDelete}from "react-icons/ai"
import { GiConfirmed } from "react-icons/gi" 

export default function ToDoList(props){
    const [items,setItems]=useState([])
    const [show, setShow]=useState(false)
    const [show2, setShow2]=useState(false)
    const [ItemName, setTaksName]=useState()
    const [Discription, setTaskDesc]=useState()

    function GetItems(){
        const headers = { Authorization: `Bearer ${props.user}` };
        const data = {Id:props.user}
        axios.post(`https://localhost:7122/getItems`,{data},{headers})
        .then(res=>{
            setItems(res.data)
        })
        .catch(err=>console.log(err))
    }

    function StoreNewTask(e){
        e.preventDefault();
        axios.post("https://localhost:7122/Item",{UserId:props.user,ItemName,Discription})
        .then(res=>{
            GetItems();
            setTaksName()
            setTaskDesc()
            setShow(false)
        })
        .catch(err=>console.log(err))
    }

    function removeItem(id,itemName,discription){
        let removeBody={UserId:props.user,id,itemName,discription}
        axios.delete("https://localhost:7122/Item",{data:removeBody})
        .then(res=>{
            GetItems();
        })
        .catch(err=>console.log(err))
    }

    function updateItem(id, itemName,discription){
        axios.put("https://localhost:7122/Item",{UserId:props.user,id,itemName,discription})
        .then(res=>{
            GetItems();
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
                                <form onSubmit={(e)=>{updateItem(item.id,item.itemName,item.discription); e.preventDefault()}}>
                                    <input type="text" placeholder={item.itemName}/>
                                    <input type="text" placeholder={item.discription}/>
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
                    <form onSubmit={StoreNewTask}>
                        <input type="text" placeholder="Task-Name" onChange={e=>setTaksName(e.target.value)} />
                        <input type="text" placeholder="Task-Description" onChange={e=>setTaskDesc(e.target.value)} />
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