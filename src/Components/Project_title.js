// import React, {useEffect, useState} from "react";
// import "./Project_title.css";
// import {addProjectInfo, getProjectValues} from "../Service/FirestoreService.js";
// import TagsInput from "./TagsInput.js";
//
// function Project_title({budget, setBudget, currentUser, currentProject}) {
//     console.log("budget here:", budget);
//
//     const [values, setValues] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await getProjectValues(currentProject.id);
//             return data;
//         }
//         fetchData().then(data => {
//             if (data) {
//                 setValues(data);
//             } else {
//                 setValues([]);
//             }
//         })
//     }, []);
//
//     useEffect(() => {
//         // Save values to local storage whenever they change
//         // localStorage.setItem("projectValues", JSON.stringify(values));
//         console.log("Values Project: " + JSON.stringify(values) + ", length: " + Object.keys(values).length);
//         if (values && Object.keys(values).length !== 0) {
//             const fetchData = async () => {
//                 await addProjectInfo(values, currentProject.id);
//             }
//             fetchData().then(() => {
//                     console.log("Add project info successfully");
//                 }
//             );
//         }
//     }, [values]);
//
//
//     const handleBudgetChange = (e) => {
//         setBudget(e.target.value);
//         setValues({ ...values, budget: e.target.value });
//     };
//
//     return (
//
//         <div className="Project scrollable-project">
//             <div className="project_inline_box">
//                 <p style={{ marginRight: "32px", fontSize: "15px" }}>Scope</p>
//                 <input
//                     type="text"
//                     value={values.desc}
//                     disabled={currentUser.role == 'MEMBER' ? true : false}
//                     onChange={(e) => setValues({ ...values, desc: e.target.value })}
//                     placeholder="Enter scope"
//                 />
//             </div>
//
//             <div className="project_inline_box1">
//
//                 <p style={{ marginRight: "8px", fontSize: "15px" }}>Objectives</p>
//
//
//                 <TagsInput/>
//             </div>
//
//             <div className="project_inline_box">
//                 <p style={{ marginRight: "8px", fontSize: "15px" }}>Drive links</p>
//                 <input
//                     type="text"
//                     value={values.driveLink}
//                     disabled={currentUser.role == 'MEMBER' ? true : false}
//                     onChange={(e) => setValues({ ...values, driveLink: e.target.value })}
//                     placeholder="Enter drive link"
//                 />
//             </div>
//
//             <div className="project_inline_box">
//                 <p style={{ marginRight: "20px", fontSize: "15px" }}>Sponsor</p>
//                 <input
//                     type="text"
//                     value={values.sponsor}
//                     disabled={currentUser.role == 'MEMBER' ? true : false}
//                     onChange={(e) => setValues({ ...values, sponsor: e.target.value })}
//                     placeholder="Enter sponsor"
//                 />
//             </div>
//
//             <div className="project_inline_box budget">
//
//                 <p style={{ marginRight: "29px", fontSize: "15px" }}>Budget</p>
//                 <div>
//                     <input
//                         type="number"
//                         value={budget}
//                         disabled={currentUser.role == 'MEMBER' ? true : false}
//                         onChange={handleBudgetChange}
//                         placeholder="Enter budget"
//                         style={{ width: "90px" }}
//                     /> <span style={{ fontSize: "12px"}}>LKR</span>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Project_title;








import React, {useEffect, useState} from "react";
import "./Project_title.css";
import {addProjectInfo, getProjectValues} from "../Service/FirestoreService.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import * as singleScope from "chart.js/dist/core/core.ticks.js";
// import {getSingleElementValue} from "@testing-library/jest-dom/dist/utils.js";
// import TagsInput from "./TagsInput.js";


function Project_title({budget, setBudget, currentUser, currentProject}) {
    // console.log("budget here:", budget);

    const [values, setValues] = useState([]);

    const [objective, setObjective] = useState(
        [
            {objective:""}
        ]
    );

    console.log("objective: ",objective);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjectValues(currentProject.id);
            return data;
        }
        fetchData().then(data => {
            if (data) {
                setValues(data);
            } else {
                setValues([]);
            }
        })
    }, [currentProject.id]);

    useEffect(() => {
        // Save values to local storage whenever they change
        // localStorage.setItem("projectValues", JSON.stringify(values));
        console.log("Values Project: " + JSON.stringify(values) + ", length: " + Object.keys(values).length);
        if (values && Object.keys(values).length !== 0) {
            const fetchData = async () => {
                await addProjectInfo(values, currentProject.id);
            }
            fetchData().then(() => {
                    console.log("Add project info successfully");
                }
            );
        }
    }, [values]);

    const handleObjectiveAdd = () => {
        setObjective([...objective, {objective: ""}])
    };

    const handleObjectiveRemove = (index) => {
        const list = [...objective]
        list.splice(index,1);
        setObjective(list)
    };

    const handleObjectiveChange = (e, index) => {
        const {name,value} = e.target
        const list = [...objective];
        list[index][name] = value;

        setObjective(list);
    }

    const handleScopeChange = (e,index)=>{
        const{name,value} = e.target
        const list=[values];
        list[index][name] = value;

        setValues(list);
    }

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
        setValues({ ...values, budget: e.target.value });
    };

    // function addNewLines(){
    //     text = document.getElementById('objective').value;
    //     text=text.replace(/ /g, "[sp] [sp]");
    //     text=text.replace(/\n/g, "[nl]");
    //     document.getElementById('objective').value = text;
    //
    // }
    const listContainer = document.getElementById("list-container");
    const inputBox = document.getElementById("input-box");


    function addTask(event) {
        event.preventDefault()
        if (inputBox.value === '') {
            alert("You must write something!");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span)
        }
        inputBox.value = "";
    }

    listContainer.addEventListener("click", function (e) {
        // if(e.target.tagName === "LI"){
        //     e.target.classList.toggle("checked");
        // }
        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }

    }, false);


    function onEditDesc(){

    }





    return (
<form>
        <div className="Project scrollable-project">
            <div className="project_inline_box">
                <p style={{ marginRight: "40px", fontSize: "15px" }}>Scope</p>
                <textarea
                    rows={10}
                    cols={5}
                    type="text"
                    value={values.desc}
                    // disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, desc: e.target.value })}
                    placeholder="Enter scope"
                />
                <FontAwesomeIcon icon={faPenToSquare}
                                 onClick={(event) => onEditDesc(event,values.desc)}/>
            </div>



            <div className="form-field">
                        <p style={{ marginRight: "8px", fontSize: "15px",  }}>Objective(s)</p>
                            <textarea
                                rows={10}
                                cols={5}
                                type="text"
                                value={values.objectives}
                                placeholder="Enter Objectives...."
                                onChange={(e) => setValues({ ...values, objectives: e.target.value })}
                            />
                <FontAwesomeIcon icon={faPenToSquare}
                                 onClick={(event) => onEditDesc(event,values.objectives)}/>
                    </div>



            <div className="project_inline_box">
                <p style={{ marginRight: "11px", fontSize: "15px", marginBottom:"15px" }}>Drivelink(s)</p>
                <textarea
                    type="text"
                    value={values.driveLink}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, driveLink: e.target.value })}
                    placeholder="Enter drive link"
                />
                <FontAwesomeIcon icon={faPenToSquare}

                                 onClick={(event) => onEditDesc(event,values.driveLink)}/>
            </div>



            <div className="project_inline_box">
                <p style={{ marginRight: "28px", fontSize: "15px", marginBottom:"15px" }}>Sponsor</p>
                <textarea
                    type="text"
                    value={values.sponsor}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, sponsor: e.target.value })}
                    placeholder="Enter sponsor"
                />
                <FontAwesomeIcon icon={faPenToSquare}
                                 onClick={(event) => onEditDesc(event,values.sponsor)}/>
            </div>



            <div className="project_inline_box_task">
                <p style={{ marginRight: "28px", fontSize: "15px", marginBottom:"15px" }}>Tasks</p>
                <input
                    id="input-box"
                    type="text"
                    value={values.task}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, task: e.target.value })}
                    placeholder="Enter Task"
                />
                <button className="taskAdd" onClick={(event) => addTask(event)}>
                    Add
                </button>

            </div>



            <div className="output">
            <ol id="list-container">
                {/*<li className="checked">Task 1</li>*/}
                {/*<li>Task 2</li>*/}
                {/*<li>Task 3</li>*/}
            </ol>
            </div>






            <div className="project_inline_box budget">

                <p style={{ marginRight: "34px", fontSize: "15px" }}>Budget</p>
                <div>
                    <textarea
                        type="text"
                        value={budget}
                        disabled={currentUser.role === 'MEMBER' ? true : false}
                        onChange={handleBudgetChange}
                        placeholder="Enter budget"
                        style={{ width: "90px" }}
                    /> <span style={{ fontSize: "12px"}}>LKR</span>
                    <FontAwesomeIcon icon={faPenToSquare}
                                     onClick={(event) => onEditDesc(event,budget)}/>
                </div>
            </div>
        </div>
</form>
    );
// }
}

export default Project_title;