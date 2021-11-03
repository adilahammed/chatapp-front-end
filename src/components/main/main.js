import React,{useState,useEffect} from 'react'
import Login from './login/login'
import Createacc from './login/createacc'
import Home from './home/home'
import './main.css'

let token=localStorage.getItem("iu")
function Main() {
    const[page,setPage]=useState("")
    useEffect(() => {
        
        if(token ===null || token===""){
            setPage("login")
        }
        else if(token !== null){
          
            setPage("homepage")
        }
       else if(token !== ""){
        
            setPage("homepage")
        }
      
    }, [])
    
    const changepage=(a)=>{
        setPage(a)
    }

    const tokenmanage=(t)=>{
        
        localStorage.setItem("iu", t);
        token=localStorage.getItem("iu")
        
        if(token!==""){
            setPage("homepage")
        }else{
            setPage("login")
        }     
    }

    if(page==="login"){
        return(
            <div>
                <Login tokenmanage={tokenmanage} changepage={changepage} />
            </div>
        )
    }else if(page==="createacc"){
        return(
            <div>
               <Createacc changepage={changepage} />
            </div> 
        )
    }else if(page==="homepage" ){
        return(
            <div className="fir">
                <Home token={token} tokenmanage={tokenmanage} />
            </div>
        )
    }
    else{
        return(
            <div>

            </div>
        )
    }
    
}
export default Main
