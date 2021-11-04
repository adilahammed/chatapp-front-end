import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Searchlist from './searchlist/searchlist'

export default function Search({searchval,token}) {
    const [searchlist, setsearchlist] = useState([])
    let mount
    useEffect(() => {
        mount=true
       
        return () => {
            mount=false
         

        }
    }, [])

    useEffect(() => {
        let timeid=setTimeout(()=>{
            axios({
                url:'https://lighttext.herokuapp.com/api/no/users/search',
                method:"get",
                headers:{"Authorization":`Bearer ${token}`},
                params:{searchval}
            }).then((res)=>{
                if(res.status===200){
                    setsearchlist(res.data)
                    //console.log(searchlist);
                }else if(res.status===401){
                    
                }     
            })
        },2000)
        return () => {
            clearTimeout(timeid);
        }
    }, [searchval])

    return (
        <div>
            <h1>{searchval}</h1>
            {searchlist.map((a,i)=>{
                 return <Searchlist key={i} username={a.username} email={a.email} 
                 picture={a.picture} token={token} />
            })}
        </div>
    )
}
