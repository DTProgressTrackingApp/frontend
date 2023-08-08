import {useState} from "react";
// import {Children as tags} from "react-toggle/dist/docs/bundle.js";
import  "../Service/FirestoreService.js";
import 'firebase/database';
import 'firebase/auth';
import "./Project_title.css";

function TagsInput(){
    const [tags,setTags] = useState([]);



function handleKeyDown(e) {
    if(e.key !== 'Enter')
        return
    const value = e.target.value
    if(!value.trim())
        return;
    setTags([...tags,value])
    e.target.value = ''
}

function removeTag(index){
    setTags(tags.filter((e1,i) =>i !== index))
}



return(
        <div className="tags-input-container">
            {/*<div className="tag-item">*/}
            {/*    <span className="text">hello</span>*/}
            {/*    <span className="close">&times;</span>*/}
            {/*</div>*/}

            { tags.map((tag,index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={()=>removeTag(index)}>&times;</span>
                </div>

            ))}
            <input
                onKeyDown={handleKeyDown}
                type="text"
                className="tags-input"
                placeholder="Enter objectives..."/>
               {/*//  value={values.objectives}*/}
               {/*//  disabled={currentUser.role === 'MEMBER' ? true : false}*/}
               {/*// onChange={(e) => setValues({ ...values, objectives: e.target.value })}/>*/}



        </div>
    )
}
export default TagsInput;