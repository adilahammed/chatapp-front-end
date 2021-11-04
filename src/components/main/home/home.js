import React,{useState,useEffect} from 'react'
import './home.css'
import {BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import axios, { Axios } from 'axios'

import Search from './search/search'
import Friends from './friends/friends'
import Settings from './settings/settings'
import {IoIosPersonAdd} from 'react-icons/io'
import Reqlist from './reqlist/reqlist'
import { io } from "socket.io-client";
let socket=io("http://localhost:8800")

export default function Home({token,tokenmanage}) {
    const [searchval, setsearchval] = useState("")
    const [homepage, sethomepage] = useState("friends")
    const [friends, setfriends] = useState([])
    const [user, setuser] = useState("")

    const [chatlist, setchatlist] = useState([])
    const [recieve, setrecieve] = useState("")

    

    useEffect(() => {
        var c=[...chatlist]
        c.push(recieve)
        setchatlist(c)
        console.log(chatlist)
    }, [recieve])
    

    useEffect(() => {
        console.log("socketttt");
        socket.on("recieve_message",(message)=>{
           setrecieve(message)
        })
    }, [])

    const setsend=(a)=>{
        var c=[...chatlist]
        c.push(a)
        setchatlist(c)
        console.log(chatlist)
    }














    
    const getdet =()=>{
        console.log("fetchhh");

        axios({
            url:"http://localhost:8800/api/no/users/friendslist",
            method:"get",
            headers:{"Authorization":`Bearer ${token}`}
        }).then((res)=>{
            if(res.status===200){
                console.log(res.data.msg.user);
                setfriends(res.data.msg.friends)
                setuser(res.data.msg.user)
            }
        })
    }
    
    useEffect(() => {
        socket.on("update",()=>{
            console.log("update");
            getdet()
        })
        socket.emit("setstatus",token)
        getdet()
        return(()=>{socket.emit("setoffline",token)})
    }, [])
  

    socket.on("connect",()=>{      
    })


    const search=()=>{
        if(searchval!==""){
            sethomepage("search")
        }
        else{
            sethomepage("friends")
        }
    }
    const page=()=>{
        if(homepage==="friends"){
            return(
                <div>
                   <Friends tokenmanage={tokenmanage}  token={token} ffriends={friends}
                   socket={socket} user={user} chatlist={chatlist} setsend={setsend} />
                </div>
            )
        }
        else if(homepage==="search"){
            return(
                <div>
                   <Search searchval={searchval} token={token} />
                </div>
            ) 
        }
        else if(homepage==="settings"){
            return(
                <div>
                   <Settings tokenmanage={tokenmanage}  token={token} />
                </div>
            ) 
        }else if(homepage==="reqlist"){
            return(
                <div>
                   <Reqlist tokenmanage={tokenmanage}  token={token} />
                </div>
            ) 
        }
        
    }
    console.log(searchval);
    return (
        <div className="home">
            <div className="homeverticle">
                <div className="head">
                        <div className="hv inbl" onClick={()=>{sethomepage("friends")}}>
                            <h1 className="inbl">{user.username}</h1>                       
                        </div> 
                        <div onClick={()=>{sethomepage("settings")}} className="settinglogo hv inbl">
                            <FiSettings size="30px" />
                        </div>
                        <div onClick={()=>{sethomepage("reqlist")}} className="reqicon inbl hv">
                            <IoIosPersonAdd color="white" size="40px" />
                        </div>
                        <div className="search inbl">
                            <input className="searchinput" value={searchval}
                            onChange={(e)=>{setsearchval(e.target.value)}}
                            placeholder="search" />    
                            <div onClick={()=>{search()}} className="searchico inbl hv">
                                <BsSearch />
                            </div>
                        </div>                     
                </div>
                <div className="body">
                    {page()}
                </div>
            </div>
            
        </div>
    )
}
