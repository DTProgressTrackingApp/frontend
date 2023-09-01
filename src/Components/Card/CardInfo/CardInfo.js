import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Type} from "react-feather";
import Modal from "../../Modal/Modal.js";
import Editable from "../../Editabled/Editable.js";
import "./CardInfo.css";
import { v4 as uuidv4 } from 'uuid';

import {db} from "../../../Config/Firebase.js";
import {collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import {useForm} from "react-hook-form";



function CardInfo(props) {
    const {clearErrors, setError, formState: { errors } } = useForm();

    const taskId = uuidv4();


    const [values, setValues] = useState(props.card);
    const totalWeight = props.totalWeight;
    const setTotalWeight = props.setTotalWeight;


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

    const [startDate, setStartDate] = useState(values.startDate || "");
    const [endDate, setEndDate] = useState(values.endDate || "");
    const [actualStartDate, setActualStartDate] = useState(values.actualStartDate || "");
    const [actualEndDate, setActualEndDate] = useState(values.actualEndDate || "");

    const [subPlannedStartDate, setSubPlannedStartDate] = useState(values.subPlannedStartDate || "");
    const [subPlannedEndDate, setSubPlannedEndDate] = useState(values.subPlannedEndDate || "");
    const [subActualStartDate, setSubActualStartDate] = useState(values.subActualStartDate || "");
    const [subActualEndDate, setSubActualEndDate] = useState(values.subActualEndDate || "");

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
        clearErrors(["weight"]);
        const weightInput = event.target.value;
        const remainWeight = 100 - totalWeight;
        console.log("weightInput: " + weightInput + ",totalWeight: " + totalWeight + ",remainWeight: " + remainWeight);
        if (weightInput >= remainWeight) {
            setError('weight', {
                type: 'exceed',
                message: 'Please input weight should not exceed current remain weight ' + remainWeight
            })
            event.target.focus();
            return;
        }
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


const subTask = [
    {

    }
]
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

    const updateSubDate = (id, fieldName, date) => {
        if (!date) return;
        clearErrors(['subActualStartDate', 'subActutalEndDate']);
        if (subPlannedStartDate && fieldName == 'subPlannedEndDate') {
            const start = new Date(subPlannedStartDate).getTime();
            const end = new Date(date).getTime();
            if (subActualStartDate) {
                const actualDate = new Date(subActualStartDate).getTime();
                if (actualDate < start || actualDate > end) {
                    alert('subActualStartDate must have a date between subPlannedStartDate and subPlannedEndDate');
                    return;
                }
            }
            if (subActualEndDate) {
                const actualDate = new Date(subActualEndDate).getTime();
                if (actualDate < start || actualDate > end) {
                    alert('subActualEndDate must have a date between subPlannedStartDate and subPlannedEndDate');
                    return;
                }
            }
        } else if (subPlannedEndDate && fieldName == 'subPlannedStartDate') {
            const start = new Date(date).getTime();
            const end = new Date(subPlannedEndDate).getTime();
            if (subActualStartDate) {
                const actualDate = new Date(subActualStartDate).getTime();
                if (actualDate < start || actualDate > end) {
                    alert('subActualStartDate must have a date between subPlannedStartDate and subPlannedEndDate');
                    return;
                }
            }
            if (subActualEndDate) {
                const actualDate = new Date(subActualEndDate).getTime();
                if (actualDate < start || actualDate > end) {
                    alert('subActualEndDate must have a date between subPlannedStartDate and subPlannedEndDate');
                    return;
                }
            }
        } else if (subPlannedStartDate && subPlannedEndDate) {
            const start = new Date(subPlannedStartDate).getTime();
            const end = new Date(subPlannedEndDate).getTime();
            if (fieldName == 'subActualStartDate' || fieldName == 'subActualEndDate') {
                const currentDate = new Date(date).getTime();
                if (currentDate < start || currentDate > end) {
                    alert(fieldName + ' must have a date between subPlannedStartDate and subPlannedEndDate');
                    return;
                }
            } else if (subPlannedStartDate < actualStartDate || subPlannedStartDate > actualEndDate) {
                alert('subPlannedStartDate must have a date between actualStartDate and actualEndDate');
                return;
            } else if (subPlannedEndDate < actualStartDate || subPlannedEndDate > actualEndDate) {
                alert('subPlannedEndDate must have a date between actualStartDate and actualEndDate');
                return;
            }
        }

        if ('subPlannedStartDate' == fieldName) {
            setSubPlannedStartDate(date);
        } else if ('subPlannedEndDate' == fieldName) {
            setSubPlannedEndDate(date);
        } else if ('subActualStartDate' == fieldName) {
            setSubActualStartDate(date);
        } else if ('subActualEndDate' == fieldName) {
            setSubActualEndDate(date);
        }

        const subTasks = [...values.subTasks];
        const taskIndex = subTasks.findIndex((item) => item.id === id);
        if (taskIndex < 0) return;

        subTasks[taskIndex][fieldName] = date;

        setValues({
            ...values,
            subTasks: subTasks,
        });
    };

    const updateDate = (fieldName, date) => {
        if (!date) return;
        clearErrors(['actualStartDate', 'actualEndDate']);
        if (startDate && fieldName == 'endDate') {
            const start = new Date(startDate).getTime();
            const end = new Date(date).getTime();
            if (actualStartDate) {
                const actualDate = new Date(actualStartDate).getTime();
                if (actualDate < start || actualDate > end) {
                    setError('actualStartDate', {
                        type: 'exceed',
                        message: 'actualStartDate must have a date between startDate and endDate'
                    })
                    return;
                }
            }
            if (actualEndDate) {
                const actualDate = new Date(actualEndDate).getTime();
                if (actualDate < start || actualDate > end) {
                    setError('actualEndDate', {
                        type: 'exceed',
                        message: 'actualEndDate must have a date between startDate and endDate'
                    })
                    return;
                }
            }
        } else if (endDate && fieldName == 'startDate') {
            const start = new Date(date).getTime();
            const end = new Date(endDate).getTime();
            if (actualStartDate) {
                const actualDate = new Date(actualStartDate).getTime();
                if (actualDate < start || actualDate > end) {
                    setError('actualStartDate', {
                        type: 'exceed',
                        message: 'actualStartDate must have a date between startDate and endDate'
                    })
                    return;
                }
            }
            if (actualEndDate) {
                const actualDate = new Date(actualEndDate).getTime();
                if (actualDate < start || actualDate > end) {
                    setError('actualEndDate', {
                        type: 'exceed',
                        message: 'actualEndDate must have a date between startDate and endDate'
                    })
                    return;
                }
            }
        } else if (startDate && endDate) {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            if (fieldName == 'actualStartDate' || fieldName == 'actualEndDate') {
                const currentDate = new Date(date).getTime();
                if (currentDate < start || currentDate > end) {
                    setError(fieldName, {
                        type: 'exceed',
                        message: fieldName + ' must have a date between startDate and endDate'
                    })
                    return;
                }
            }
        }

        if ('startDate' == fieldName) {
            setStartDate(date);
        } else if ('endDate' == fieldName) {
            setEndDate(date);
        } else if ('actualStartDate' == fieldName) {
            setActualStartDate(date);
        } else if ('actualEndDate' == fieldName) {
            setActualEndDate(date);
        }

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

    const updateSubValues = async (subTask, event) => {
        event.preventDefault();
        alert("Save subtask successfully");
        await props.updateCard(values);
        console.log("Update card successfully!");
        const subTaskTodo = values.subTasks.find(t => t.id == subTask.id);
        console.log("Before shift, sub task status: " + subTaskTodo.status);
        props.shiftSubTaskStatus(values, subTaskTodo.status, event);
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

                {props.currentUser.role == 'MANAGER' && (
                    <button style={{marginLeft:"72rem", width:'4rem',fontSize: "12px",
                        color: "#ffffff",
                        background: "black",
                        padding:"10px",
                        fontWeight: "bold",
                        position: "absolute",
                        borderRadius: "3px"}}
                            onClick={updateValues}
                    >Save</button>
                )}

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
                        currentUser={props.currentUser}
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
                        disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
                            /><span style={{ fontSize: "15px"}}>LKR</span>
                        </div>
                    </div>


                </div>

                <div className="cardinfo_inline_box">
                    <div className="cardinfo_box_title">
                        <p>KPI</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/*<input*/}
                        {/*    type="number"*/}
                        {/*    value={values.kpi}*/}
                        {/*    onChange={(e) => setValues({ ...values, kpi: e.target.value })}*/}
                        {/*    placeholder="Enter KPI"*/}
                        {/*    style={{ marginRight: '20px',width: '100px' }}*/}
                        {/*    disabled={props.currentUser.role == 'MEMBER' ? true : false}*/}
                        {/*/>*/}
                        <input
                            type="text"
                            value={values.kpiDesc}
                            onChange={(e) => {
                                // if (e.target.value.length <= 40) {
                                    setValues({ ...values, kpiDesc: e.target.value })
                                // }
                            }}
                            placeholder="Enter KPI (max 100 characters)"
                            style={{ width: '800px' }}
                            // maxLength={40}
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                        />
                        {
                            errors.weight && (
                                <span style={{ color: "red" }}>
                                    {errors.weight.message}
                                </span>
                            )
                        }
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
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                            // min={values.startDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("startDate", event.target.value)}
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                            // min={values.actualStartDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("actualStartDate", event.target.value)}
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                        />
                        {
                            // errors.actualStartDate && (
                            //     <span style={{ color: "red" }}>
                            //         {errors.actualStartDate.message}
                            //     </span>
                            // )
                        }
                    </div>

                    <div className="cardinfo_box" style={{marginRight:'4rem' }}>
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>End Date</p>
                        </div>
                        <input
                            type="date"
                            value={values.endDate || ""}
                            // min={values.startDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("endDate", event.target.value)}
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
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
                            // min={values.actualEndDate || new Date().toISOString().substr(0, 10)}
                            onChange={(event) => updateDate("actualEndDate", event.target.value)}
                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                        />
                        {
                            // errors.actualEndDate && (
                            //     <span style={{ color: "red" }}>
                            //         {errors.actualEndDate.message}
                            //     </span>
                            // )
                        }
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
                                            value={item.text}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "text", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.description}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "description", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                        />
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subPlannedStartDate || ""}
                                                onChange={(event) =>
                                                    updateSubDate(item.id, "subPlannedStartDate", event.target.value)
                                                }
                                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subPlannedEndDate || ""}
                                                onChange={(event) =>
                                                    updateSubDate(item.id, "subPlannedEndDate", event.target.value)
                                                }
                                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subActualStartDate || ""}
                                                onChange={(event) =>
                                                    updateSubDate(item.id, "subActualStartDate", event.target.value)
                                                }
                                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="calendar-input">
                                            <input
                                                type="date"
                                                value={item.subActualEndDate || ""}
                                                onChange={(event) =>
                                                    updateSubDate(item.id, "subActualEndDate", event.target.value)
                                                }
                                                disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            value={item.status || ""}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "status", event.target.value)
                                            }
                                            style={{ width: 'fit-content' }}
                                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                        >
                                            <option>--Select Status--</option>
                                            <option value="todo">To Do</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.remark}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "remark", event.target.value)
                                            }
                                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={item.membersAssigned}
                                            onChange={(event) =>
                                                updateSubTask(item.id, "membersAssigned", event.target.value)
                                            }
                                            disabled={props.currentUser.role == 'MEMBER' ? true : false}
                                            style={{ width: 'fit-content' }}
                                        />
                                    </td>

                                    {props.currentUser.role == 'MANAGER' && (
                                        <td >
                                            <button style={{ width: "3rem", backgroundColor: "white", fontSize: "8px", margin:"10px"  }} onClick={(event) => updateSubValues(item, event)}
                                                    disabled={props.currentUser.role == 'MEMBER' ? true : false}>Save</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {props.currentUser.role == 'MANAGER' && (
                            <button className="addTask" onClick={() => addSubTask("New Task")}>Add sub task</button>
                        )}
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default CardInfo;