import React,{useState} from 'react'
import axios from 'axios'

export default function Settings({tokenmanage,token}) {
    const [image, setimage] = useState("")

    const getimage=(e)=>{
        setimage(e.target.files[0])
        // console.log(e.target.files[0])
    }
    const sendimage=()=>{
        const formdata= new FormData()
        formdata.append("picture",image)
        console.log(image);
        axios({
            url:"http://localhost:8800/api/no/uploads/picture",
            method:"post",
            headers:{"Authorization":`Bearer ${token}`},
            data:formdata
        }).then((res)=>{
                if(res.status===200){
                    alert(res.data.msg)
                }
        })
    }
    return (
        <div>
            <div>
                <input type="file" onChange={(e)=>{
                    getimage(e)
                }} name="upload_file" ></input>
                <button onClick={sendimage}>send</button>
            </div>
            <h1>setting</h1>
            <div>
                <button onClick={()=>{tokenmanage("")}}> logout</button>
            </div>
        </div>
    )
}
