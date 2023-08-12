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
// import {getSingleElementValue} from "@testing-library/jest-dom/dist/utils.js";
// import TagsInput from "./TagsInput.js";

function Project_title({budget, setBudget, currentUser, currentProject, }) {
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

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
        setValues({ ...values, budget: e.target.value });
    };

    return (
// <form className="App" autoComplete="Off">
        <div className="Project scrollable-project">
            <div className="project_inline_box">
                <p style={{ marginRight: "32px", fontSize: "15px" }}>Scope</p>
                <input
                    type="text"
                    value={values.desc}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, desc: e.target.value })}
                    placeholder="Enter scope"
                />
            </div>


            <div className="form-field">
                <p style={{ marginRight: "32px", fontSize: "15px" }}>Objective(s)</p>
                {objective.map((singleObjective,index) => (
                    <div key={index} className="objectives">
                        <div className="first-division">
                            <input name="objective" type="text" id="objective" required
                                   value={singleObjective.value}
                                   placeholder="Enter Objective"
                                   onChange={(e) => handleObjectiveChange(e,index)}
                            />
                            {objective.length - 1 === index && objective.length < 4 &&
                                (
                                    <button type="button" className="add-btn"
                                    onClick={handleObjectiveAdd}>
                                        <span>Add a Objective</span>
                                    </button>
                                )}
                        </div>
                        <div className="second-division">
                            {objective.length !== 1 && (
                                <button type="button" className="remove-btn"
                                onClick ={() => handleObjectiveRemove(index)}>
                                <span>Remove</span>
                            </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="output">
                {/*<h2>output</h2>*/}
                {objective &&
                    objective.map((singleObjective, index) => (
                        <ul key = {index} >
                            {singleObjective.objective && <li>{singleObjective.objective}</li>}
                        </ul>
                    ))}
            </div>

            
            <div className="project_inline_box">
                <p style={{ marginRight: "8px", fontSize: "15px" }}>Drive links</p>
                <input
                    type="text"
                    value={values.driveLink}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, driveLink: e.target.value })}
                    placeholder="Enter drive link"
                />
            </div>

            <div className="project_inline_box">
                <p style={{ marginRight: "20px", fontSize: "15px" }}>Sponsor</p>
                <input
                    type="text"
                    value={values.sponsor}
                    disabled={currentUser.role === 'MEMBER' ? true : false}
                    onChange={(e) => setValues({ ...values, sponsor: e.target.value })}
                    placeholder="Enter sponsor"
                />
            </div>

            <div className="project_inline_box budget">

                <p style={{ marginRight: "29px", fontSize: "15px" }}>Budget</p>
                <div>
                    <input
                        type="number"
                        value={budget}
                        disabled={currentUser.role === 'MEMBER' ? true : false}
                        onChange={handleBudgetChange}
                        placeholder="Enter budget"
                        style={{ width: "90px" }}
                    /> <span style={{ fontSize: "12px"}}>LKR</span>
                </div>
            </div>
        </div>
// </form>
    );
}

export default Project_title;