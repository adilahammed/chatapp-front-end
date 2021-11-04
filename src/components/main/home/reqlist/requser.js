import React from 'react'
import './reqlis.css'
import axios from 'axios'

export default function requser({username,email,picture,token}) {

    const accept=()=>{
        axios({
            url:"https://lighttext.herokuapp.com/api/no/users/accept",
            method:"POST",
            headers:{"Authorization":`Bearer ${token}`},
            data:{username}
        }).then((res)=>{
            alert(res.data.msg)
        })
    }
    

    return (
        <div>
            <div className="searchimg inbl">
                 <img src={`https://lighttext.herokuapp.com/images/${picture}`} width="100px" height="100px">
                 </img>
            </div>
            <div className="searchtext inbl">
            <h5>{username}</h5>
            <p>{email}</p>
            </div>
            <div className="accept inbl">
                <button onClick={accept} className=" acceptbutton hv inbl">
                    accept
                </button>

            </div>
        </div>
    )
}
