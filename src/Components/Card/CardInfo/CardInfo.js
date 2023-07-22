import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Type} from "react-feather";
import Modal from "../../Modal/Modal.js";
import Editable from "../../Editabled/Editable.js";
import "./CardInfo.css";
import { v4 as uuidv4 } from 'uuid';

import {db} from "../../../Config/Firebase.js";
import {collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";



function CardInfo(props) {

    const taskId = uuidv4();


    const [values, setValues] = useState(props.card);


    const updateTitle = (value) => {
        setValues({ ...values, title: value });
    };

    const updateDesc = (value) => {
        setValues({ ...values, desc: value });
    };


    const [kpi, setKpi] = useState("");
    const [kpiDesc, setKpiDesc] = useState("");
    const [taskBudget, setTaskBudget] = useState("");
    const [cic, setCic] = useState("");
    const [weight, setWeight] = useState(values.weight || "");
    const [achievedWeight, setAchievedWeight] = useState(values.achievedWeight || "");
    const [result, setResult] = useState(0); // Store the calculated result



    const handleKpiChange = (event) => {
        setKpi(event.target.value);
    };

    const handleKpiDescChange = (event) => {
        setKpiDesc(event.target.value);
    };

    const handleTaskBudgetChange = (event) => {
        setTaskBudget(event.target.value);
        setValues({ ...values, taskBudget: event.target.value });
    };

    const handleCicChange = (event) => {
        setCic(event.target.value);
        setValues({ ...values, cic: event.target.value });
    };


    const handleWeightChange = (event) => {
        setWeight(event.target.value);
        setValues({ ...values, weight: event.target.value });
    };

    const handleAchievedWeightChange = (event) => {
        setAchievedWeight(event.target.value);
        setValues({ ...values, achievedWeight: event.target.value });
    };

    const handleResultChange = (event) => {
        setResult(event.target.value);
        setValues({ ...values, result: event.target.value });
    };



    const addSubTask = (value) => {
        const subTask = {
            id: Date.now() + Math.random() * 2,
            completed: false,
            text: value,
        };
        setValues({
            ...values,
            subTasks: [...values.subTasks, subTask],
        });
    };


    const updateSubTask = (id, field, value) => {
        const subTasks = [...values.subTasks];
        const taskIndex = subTasks.findIndex((item) => item.id === id);
        if (taskIndex < 0) return;

        subTasks[taskIndex][field] = value;

        setValues({
            ...values,
            subTasks: subTasks,
        });
    };



    const updateDate = (fieldName, date) => {
        if (!date) return;

        setValues({
            ...values,
            [fieldName]: date,
        });
    };



    const updateValues = async () => {
        alert("Save task successfully");
        props.updateCard(values);
        // const taskRef = doc(db, "taskInfo", taskId);
        //
        // // Update the document with the new values
        // await updateDoc(taskRef, {
        //     title:values.title,
        //     desc: values.desc,
        //     kpi: values.kpi,
        //     cic: values.cic,
        //     taskBudget: values.taskBudget,
        //     weight: values.weight,
        //     achievedWeight: values.achievedWeight,
        // });

        console.log(" updated values in Firestore");
    };

    const updateSubValues = async () => {
        alert("Save subtask successfully");
        props.updateCard(values);
        // const subTaskRef = doc(db, "taskInfo", subTaskId);

        // Update the document with the new values
        // await updateDoc(subTaskRef, {
        //     subTitle:values.subTitle,
        // subDescription:values.subDescription,
        // subPlannedStartDate:values.subPlannedStartDate,
        // subPlannedEndDate:values.subPlannedEndDate,
        // subActualStartDate:values.subActualStartDate,
        // subActualEndDate:values.subActualEndDate,
        // subStatus:values.subStatus,
        // subRemark:values.subRemark,
        // subMembersAssigned:values.subMembersAssigned,
        // });

        console.log(" updated sub values in Firestore");
    };



    useEffect(() => {
        console.log("values: " + JSON.stringify(values));
        // if (props.updateCard) {
        //     props.updateCard(props.boardId, values.id, values, weight);
        // }
    }, [values, weight]);


    useEffect(() => {
        const calculatedResult = (parseInt(weight) * parseInt(achievedWeight)) / 100;
        setValues((prevValues) => ({
            ...prevValues,
            result: calculatedResult,
        }));
    }, [weight, achievedWeight]);




    return (
        <Modal onClose={props.onClose}>
            <div className="cardinfo">

                <button style={{marginLeft:"72rem", width:'4rem',fontSize: "12px",
                    color: "#ffffff",
                    background: "black",
                    padding:"10px",
                    fontWeight: "bold",
                    borderRadius: "3px"}} onClick={updateValues}>Save</button>

                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <Type />
                        <p>Title</p>
                    </div>
                    <Editable
                        defaultValue={values.title}
                        text={values.title}
                        placeholder="Enter Title"
                        onSubmit={updateTitle}
                    />
                </div>

                <div className="cardinfo_inline_box">
                    <div className="cardinfo_box_title">
                        <List />
                        <p>Description</p>
                    </div>
                    <input
                        type="text"
                        value={values.desc}
                        onChange={(e) => setValues({ ...values, desc: e.target.value })}
                        placeholder="Enter description"
                        style={{ width: '920px' }}
                    />
                </div>

                <div className="cardinfo_inline_boxes">
                <div className="cardinfo_inline_box" style={{ paddingRight: '2rem', width: '18rem' }}>
                    <div className="cardinfo_box_title">
                        <p>Budget</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={values.taskBudget}
                            onChange={(e) => setValues({ ...values, taskBudget: e.target.value })}
                            placeholder="Enter Budget"
                            style={{ width: '200px',marginRight: '10px' }}
                        /><span style={{ fontSize: "15px"}}>LKR</span>
                    </div>
                </div>

                    <div className="cardinfo_inline_box" style={{ paddingRight: '2rem', width: '18rem' }}>
                        <div className="cardinfo_box_title">
                            <p>Current incurred cost</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="number"
                                value={values.cic}
                                onChange={(e) => setValues({ ...values, cic: e.target.value })}
                                placeholder="Enter Current incurred cost"
                                style={{ width: '200px',marginRight: '10px' }}
                            /><span style={{ fontSize: "15px"}}>LKR</span>
                        </div>
                    </div>


                </div>

                <div className="cardinfo_inline_box">
                    <div className="cardinfo_box_title">
                        <p>KPI</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={values.kpi}
                            onChange={(e) => setValues({ ...values, kpi: e.target.value })}
                            placeholder="Enter KPI"
                            style={{ marginRight: '20px',width: '100px' }}
                        />
                        <input
                            type="text"
                            value={values.kpiDesc}
                            onChange={(e) => {
                                if (e.target.value.length <= 40) {
                                    setValues({ ...values, kpiDesc: e.target.value })
                                }
                            }}
                            placeholder="Enter KPI (max 100 characters)"
                            style={{ width: '800px' }}
                            maxLength={40}
                        />
                    </div>
                </div>


                <div className="cardinfo_inline_boxes">
                    <div className="cardinfo_inline_box">
                        <div className="cardinfo_box_title">
                            <p>Weight (%)</p>
                        </div>
                        <input
                            type="number"
                            value={weight}
                            onChange={handleWeightChange}
                            placeholder="Enter Weight (max 100)"
                            className="input_box"
                            style={{ width: '300px' }}
                            max={100}
                        />

                    </div>
                    <div className="cardinfo_inline_box">
                        <div className="cardinfo_box_title">
                            <p>Achieved Weight (%)</p>
                        </div>
                        <input
                            type="number"
                            value={achievedWeight}
                            onChange={handleAchievedWeightChange}
                            placeholder="Enter achieved weight (max 100)"
                            className="input_box"
                            style={{ width: '300px' }}
                            max={100}
                        />

                    </div>
                </div>


                <div className="card_dates" >
                    <div className="cardinfo_box" style={{marginRight:'4rem' }}>
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>Start Date</p>
                        </div>
                        <input
                            type="date"
                            value={values.startDate || ""}
                            min={values.startDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("startDate", event.target.value)}
                        />


                    </div>

                    <div className="cardinfo_box" style={{marginRight:'4rem' }}>
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>Actual Start Date</p>
                        </div>
                        <input
                            type="date"
                            value={values.actualStartDate || ""}
                            min={values.actualStartDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("actualStartDate", event.target.value)}
                        />
                    </div>

                    <div className="cardinfo_box" style={{marginRight:'4rem' }}>
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>End Date</p>
                        </div>
                        <input
                            type="date"
                            value={values.endDate || ""}
                            min={values.startDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("endDate", event.target.value)}
                        />
                    </div>


                    <div className="cardinfo_box" style={{marginRight:'4rem' }}>
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>Actual End Date</p>
                        </div>
                        <input
                            type="date"
                            value={values.actualEndDate || ""}
                            min={values.actualEndDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("actualEndDate", event.target.value)}
                        />
                    </div>

                </div>



                <div className="subtask_box">
                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <CheckSquare />
                            <p>Sub Tasks</p>
                        </div>

                        <table className="subtask_table">
                            <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Planned Start Date</th>
                                <th>Planned End Date</th>
                                <th>Actual Start Date</th>
                                <th>Actual End Date</th>
                                <th>Status</th>
                                <th>Remark</th>
                                <th>Members Assigned</th>

                            </tr>
                            </thead>

                            <tbody>
                            {values.subTasks?.map((item) => (
                                <tr key={item.id} className={"subtask_card"}>

                                    <td >
                                        <input
                                            type="text"
                                            value={item.subTitle}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "text", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.subDescription}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "description", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subPlannedStartDate || ""}
                                                onChange={(event) =>
                                                    updateSubTask(item.id, "subPlannedStartDate", event.target.value)
                                                }

                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subPlannedEndDate || ""}
                                                onChange={(event) =>
                                                    updateSubTask(item.id, "subPlannedEndDate", event.target.value)
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subActualStartDate || ""}
                                                onChange={(event) =>
                                                    updateSubTask(item.id, "subActualStartDate", event.target.value)
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subActualEndDate || ""}
                                                onChange={(event) =>
                                                    updateSubTask(item.id, "subActualEndDate", event.target.value)
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            value={item.subStatus || ""}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "subStatus", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.subRemark}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "remark", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.subMembersAssigned}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "membersAssigned", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>
                                    <td >
                                        <button style={{ width: "4rem",  }} onClick={() => updateSubValues(item.id)}>Save subtask</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button className="addTask" onClick={() => addSubTask("New Task")}>Add sub task</button>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default CardInfo;