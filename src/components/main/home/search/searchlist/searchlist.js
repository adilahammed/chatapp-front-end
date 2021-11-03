import React,{useState} from 'react'
import './searchlist.css'
import {GrAddCircle} from 'react-icons/gr'
import axios from 'axios'

export default function Searchlist({username,email,picture,token}) {
   const [send, setsend] = useState("send")
   const [complete, setcomplete] = useState("")
   const sendreq=(a)=>{
        setsend(a)
        if(a==="yes"){
            axios({
                url:"http://localhost:8800/api/no/users/sendreq",
                method:"post",
                headers:{"Authorization":`Bearer ${token}`},
                data:{username}
            }).then((res)=>{
                
                    setsend("complete")
                    setcomplete(res.data.msg)
                    alert(res.data.msg)
                
            })
        }
   }
   
   const requesttab=()=>{
       if(send==="send"){
           return(
            <div onClick={()=>{sendreq("confirm")}} className="hv">
              <GrAddCircle size="50px" />
            </div>
           )
       }else if(send==="confirm"){
           return(
            <div>
                <p>do you want to send request</p>
                <button onClick={()=>{sendreq("yes")}}>yes</button>
            </div>
           )
       }else if(send==="complete"){
           return(
            <div>
            <p>{complete}</p>
            </div>
           )
       }
   }

   return (
        <div className="searchlist">
            <div className="searchimg inbl">
                 <img src="http://localhost:8800/images/user.png" width="100px" height="100px">
                 </img>
            </div>
            <div className="searchtext inbl">
            <h5>{username}</h5>
            <p>{email}</p>
            </div>
            <div  className="request inbl">
               {requesttab()} 
            </div>
        </div>
    )
}
