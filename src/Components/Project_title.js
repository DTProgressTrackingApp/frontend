import React, { useEffect, useState } from "react";
import "./Project_title.css";
import {setBatch} from "react-redux/es/utils/batch.js";
import {addProjectInfo, getKanbanProject, getProjectValues} from "../Service/FirestoreService.js";
import {set} from "react-hook-form";

function Project_title({budget, setBudget}) {
    console.log("budget here:", budget);

    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjectValues();
            return data;
        }
        fetchData().then(data => {
            if (data) {
                setValues(data);
            } else {
                setValues([]);
            }
        })
    }, []);

    useEffect(() => {
        // Save values to local storage whenever they change
        // localStorage.setItem("projectValues", JSON.stringify(values));
        console.log("Values Project: " + JSON.stringify(values) + ", length: " + Object.keys(values).length);
        if (values && Object.keys(values).length !== 0) {
            const fetchData = async () => {
                await addProjectInfo(values);
            }
            fetchData().then(() => {
                    console.log("Add project info successfully");
                }
            );
        }
    }, [values]);


    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
        setValues({ ...values, budget: e.target.value });
    };

    return (

        <div className="Project scrollable-project">
            <div className="project_inline_box">
                <p style={{ marginRight: "32px", fontSize: "15px" }}>Scope</p>
                <input
                    type="text"
                    value={values.desc}
                    onChange={(e) => setValues({ ...values, desc: e.target.value })}
                    placeholder="Enter scope"
                />
            </div>

            <div className="project_inline_box">
                <p style={{ marginRight: "8px", fontSize: "15px" }}>Objectives</p>
                <input
                    type="text"
                    value={values.objectives}
                    onChange={(e) => setValues({ ...values, objectives: e.target.value })}
                    placeholder="Enter objectives"
                />
            </div>

            <div className="project_inline_box">
                <p style={{ marginRight: "8px", fontSize: "15px" }}>Drive links</p>
                <input
                    type="text"
                    value={values.driveLink}
                    onChange={(e) => setValues({ ...values, driveLink: e.target.value })}
                    placeholder="Enter drive link"
                />
            </div>

            <div className="project_inline_box">
                <p style={{ marginRight: "20px", fontSize: "15px" }}>Sponsor</p>
                <input
                    type="text"
                    value={values.sponsor}
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
                        onChange={handleBudgetChange}
                        placeholder="Enter budget"
                        style={{ width: "90px" }}
                    /> <span style={{ fontSize: "12px"}}>LKR</span>
                </div>
            </div>
        </div>
    );
}

export default Project_title;
