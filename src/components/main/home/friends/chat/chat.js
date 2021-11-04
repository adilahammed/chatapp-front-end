import React,{useState,useEffect,useRef} from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import {BsThreeDotsVertical} from 'react-icons/bs'
import Scrolltobottom from 'react-scroll-to-bottom'
import './chat.css'
import axios from 'axios'

export default function Chat({changepage,chatprofile,socket,user,chatlist,setsend,token}) {
    const [chattext, setchattext] = useState("")
    const [showchat, setshowchat] = useState([])
    const [option, setoption] = useState(false);
  
    
    const trigeroption=()=>{
        setoption(true)
        setTimeout(()=>{
            setoption(false)
        },3000)
    }
    
    const unfollow=()=>{
        axios({
            url:"https://lighttext.herokuapp.com/api/no/users/unfollow",
            method:"post",
            headers:{"Authorization":`Bearer ${token}`},
            data:{name:chatprofile.username}
        }).then((res)=>{
            if(res.status===200){
                alert(res.data.msg)
            }
        })
    }

    const sendmessage=()=>{
       
        if(chattext!==""){
            let message={
                from:user.username,
                to:chatprofile.status,
                text:chattext
            }
            socket.emit("send_message",message)
            setsend(message)
            setchattext("")
        }
    }
   
    //console.log(chatlist);
    return (
        <div>
            <div>
                <div className="chathead">
                    <div className="inbl">
                        <div onClick={()=>{changepage("friends")}} className="backbutton hv inbl">
                            <IoIosArrowBack size="30px" />
                        </div>
                        <img className="chatimage" src={`https://lighttext.herokuapp.com/images/${chatprofile.picture}`} width="50px" height="50px"></img>
                    </div>
                    <div className="inbl headname">
                        <h2 className="inbl ">
                            {chatprofile.username}
                        </h2>
                        {chatprofile.status !=="offline"?"online":"offline"}
                        
                    </div>
                    <div className="inbl hv options">
                        {option !==true?
                        <div onClick={()=>{trigeroption()}} >
                            <BsThreeDotsVertical size="40px" />
                        </div>
                        :
                        <div className=" optionask">
                            <p className="inbl">do you want to unfollow?</p>
                            <button onClick={unfollow} className="inbl yesbutton hv">yes</button>
                        </div>
                        }


                    </div>
                </div>
            </div>
            <div className="cen">
                <div className= " chatbody cen" >
                        <Scrolltobottom className="cha"> 
                    <div className="cha">
                        {chatlist.map((a,i)=>{
                        return (
                                    <div key={i} >
                                        <div key={i} >
                                            <p key={i} className={a.from===user.username?"send":"rec"}  >{a.text}</p> 

                                            {/* <p>908</p> */}
                                        </div>
                                    </div>
                                ) 
                        })}

                    </div>

                        </Scrolltobottom >
                </div>
            </div>
            <div className="footer">
            <input className="chatinput" onKeyPress={(e)=>{
                        if(e.key==="Enter"){
                            sendmessage()
                        }
                }} autoFocus={true} onChange={(e)=>{
                    setchattext(e.target.value)
                }} 
                   value={chattext} placeholder="type here..."></input>
                <button className="chatbutton"  onClick={sendmessage}>Send</button>
            </div>
        </div>
    )
}
