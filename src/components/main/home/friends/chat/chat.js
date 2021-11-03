import React,{useState,useEffect,useRef} from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import Scrolltobottom from 'react-scroll-to-bottom'
import './chat.css'

export default function Chat({changepage,chatprofile,socket,user,chatlist,setsend}) {
    const [chattext, setchattext] = useState("")
    const [showchat, setshowchat] = useState([])
    // const divRef=useRef(null)

    // useEffect(() => {
    //     divRef.current.scrollIntoView({ behavior: 'smooth' });
    // }, [chatlist])
   
  
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
   
    console.log(chatlist);
    return (
        <div>
            <div>
                <div className="chathead">
                    <div className="inbl">
                        <div onClick={()=>{changepage("friends")}} className="backbutton hv inbl">
                            <IoIosArrowBack size="30px" />
                        </div>
                        <img className="chatimage" src={`http://localhost:8800/images/${chatprofile.picture}`} width="50px" height="50px"></img>
                    </div>
                    <div className="inbl headname">
                        <h2 className="inbl ">
                            {chatprofile.username}
                        </h2>
                        {chatprofile.status !=="offline"?"online":"online"}
                        
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
