import { useEffect, useState } from "react"
import ToDoList from "./ToDoList"
import LogOrSign from "./LogOrSign"

export default function App(){
    const [user,setUser]=useState()
    const [theme, setTheme] = useState("light")
    return(
        <>
            {user?<ToDoList 
                setTheme={setTheme} 
                theme={theme} 
                user={user} 
                setUser={setUser} 
            />:
            <LogOrSign 
                user={user} 
                setUser={setUser} 
                theme={theme} 
                setTheme={setTheme}
            />}
        </>
    )
}