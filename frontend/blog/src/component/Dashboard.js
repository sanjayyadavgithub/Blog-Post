import React, { useEffect, useState } from 'react'

const Dashboard = () =>{
    const [blogData,setBlogData] = useState()
    useEffect(async()=>{
        const res = await axios.get("http://localhost:8800/api/blog/getAll").then(res=>{return res}).catch(err=>{return err}) 
        setBlogData(res.data)
    })

    return (
        <div>
           {blogData && blogData.map((val,ind)=>{
              return (
                <div>
                     <h1>{val.title}</h1>
                     <img src={val.image} alt={val.title} style={{width:'30px',height:'50px'}}/>
                     <p>{val.description}</p>
                </div>
              )
           })}
        </div>
    )
}

export default Dashboard