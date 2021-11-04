import React,{useState,useEffect} from 'react'
import './friendslist.css'
export default function Friendslist({username,picture,status,lastchat}) {
    const [lasttext, setlasttext] = useState("")

    useEffect(() => {
        if(lastchat[lastchat.length-1]){
            //console.log(lastchat[lastchat.length-1].text);
            setlasttext(lastchat[lastchat.length-1].text)
        }
    }, [lastchat])

    
    
    return (
        <div>
            <div className="friendslistimage inbl">
                <img className="friendslistimage" src={`https://lighttext.herokuapp.com/images/${picture}`} width="100px" height="100px"></img>
            </div>
            <div className="inbl friendslisttext">
                <h3>{username}</h3>
                <p className="lastext">
                    {lasttext}
                </p>
            </div>
            <div className="status">
                <p>{status==="offline"?"offline":"online"}</p>
            </div>
        </div>
    )
}
