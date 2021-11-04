import React,{useEffect,useState,useRef} from 'react'
import Friendslist from './friendlist/friendslist'
import Chat from './chat/chat'

export default function Friends({token,tokenmanage,ffriends,socket,user,chatlist,setsend}) {
    const [chat, setchat] = useState("friends")
    const [chatprofile, setchatprofile] = useState("");
    // const [chatlist, setchatlist] = useState([])
    const [recieve, setrecieve] = useState("")
    
    useEffect(() => {
        ffriends.map((a)=>{
            if(a.username===chatprofile.username){
                setchatprofile(a)
            }
        })
    }, [ffriends])

    // useEffect(() => {
    //     var c=[...chatlist]
    //     c.push(recieve)
    //     setchatlist(c)
    //     //console.log(chatlist)
    // }, [recieve])
    

    // useEffect(() => {
    //     //console.log("socketttt");
    //     socket.on("recieve_message",(message)=>{
    //        setrecieve(message)
    //     })
    // }, [])
    

        // const setsend=(a)=>{
        //     var c=[...chatlist]
        //     c.push(a)
        //     setchatlist(c)
        //     //console.log(chatlist)
        // }
    const changepage=(v)=>{
        setchat(v)
    }
  

    const showpage=()=>{
        
        if(chat==="friends"){
            return(           
                ffriends.map((a,i)=>{ 
                    let filc=chatlist.filter((b)=>{
                        if(b.from===a.username || b.to===a.status){
                            return true
                        }
                    })
                    
                    return(
                        <div className="hv" onClick={()=>{setchat("chat") ;setchatprofile(a) }} key={i}>
                             <Friendslist  username={a.username} picture={a.picture}
                              status={a.status} lastchat={filc}  />
                        </div>
     
                    ) 
                 })
            )
        }else if(chat==="chat"){
            
            

            let filchat=chatlist.filter((a)=>{
                if(a.from===chatprofile.username || a.to===chatprofile.status ){
                    return true 
                }
            })
            
            return <Chat   chatprofile={chatprofile} changepage={changepage}
             socket={socket} user={user} chatlist={filchat} setsend={setsend} token={token} />
        }
    }


    return (
        <div>
            {showpage()}
        </div>
    )
}
