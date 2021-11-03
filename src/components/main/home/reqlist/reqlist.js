import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Requser from './requser'
import requser from './requser'

export default function Reqlist({token,tokenmanage}) {
    const [reqlist, setreqlist] = useState([])
    useEffect(() => {
        axios({
            url:"http://localhost:8800/api/no/users/reqlist",
            method:"get",
            headers:{"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            if(res.status===200){
                setreqlist(res.data.msg)
            }
            console.log(res.data.msg);
        })
    }, [])
    
    
    return (
        <div>
            {reqlist.map((a,i)=>{
            return <Requser key={i} username={a.username} email={a.email}
             picture={a.picture} token={token} />
            })}
        </div>
    )
}
