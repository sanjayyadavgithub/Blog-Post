import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const BlogPost = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate(); 

    const onButtonClick = async() => {
        if(title && description){
            const res = await axios.post("http://localhost:8800/api/blog/create",{title,description,image}).then(res=>{return res}).catch(err=>{return err})
            alert(res.msg)
        }
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Blog Page</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={title}
                placeholder="Enter your title"
                onChange={ev => setTitle(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={description}
                placeholder="Enter your Description"
                onChange={ev => setDescription(ev.target.value)}
                className={"inputBox"} />
        </div>
        <div className={"inputContainer"}>
            <input
                value={image}
                type="file"
                onChange={ev => setImage(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Post Blog"} />
        </div>
    </div>
}

export default BlogPost