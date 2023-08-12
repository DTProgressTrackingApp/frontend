// import {useEffect, useState} from "react";
// import  "../Service/FirestoreService.js";
// import 'firebase/database';
// import 'firebase/auth';
// import "./Project_title.css";
// import {addProjectInfo, getProjectValues} from "../Service/FirestoreService.js";
//
// function TagsInput(){
//     const [tags,setTags] = useState([]);
//
//
//
// function handleKeyDown(e) {
//     if(e.key !== 'Enter')
//         return
//     const value = e.target.value
//     if(!value.trim())
//         return;
//     setTags([...tags,value])
//     e.target.value = ''
// }
//
// function removeTag(index){
//     setTags(tags.filter((e1,i) =>i !== index))
// }
//
//
//
//
//
//
// return(
//         <div className="tags-input-container">
//             { tags.map((tag,index) => (
//                 <div className="tag-item" key={index}>
//                     <span className="text">{tag}</span>
//                     <span className="close" onClick={()=>removeTag(index)}>&times;</span>
//                 </div>
//
//             ))}
//             <input
//                 onKeyDown={handleKeyDown}
//                 type="text"
//                 className="tags-input"
//                 // disabled={currentUser.role == 'MEMBER' ? true : false}
//                 // onChange={(e) => setValues({ ...values, desc: e.target.value })}
//                 placeholder="Enter objectives..."/>
//         </div>
//     )
// }
// export default TagsInput;
