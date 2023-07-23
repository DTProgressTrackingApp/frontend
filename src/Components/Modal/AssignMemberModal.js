import React, {useEffect, useState} from "react";
import "./AssignMemberModal.css";
import { useForm } from "react-hook-form";
import {authToken} from "../../Service/AuthService.js";
import {useNavigate} from "react-router-dom";
import {addKanpanProject, getKanbanProject} from "../../Service/FirestoreService.js";

export const AssignMemberModal = ({project, setIsOpen}) => {
    const {clearErrors, register, setError, formState: { errors } } = useForm();
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // only runs once
        console.log('Run auth token once');
        if (!authToken()) {
            navigate("/") // Redirect to login page
        }
    }, []);

    const removeEmailMember = async (e) => {
        e.preventDefault();

        const memberEmail = e.target.getAttribute("data-removeemail");
        const otherMembers = project.members.filter(e => e !== memberEmail);

        // let allCurrentProj = JSON.parse(localStorage.getItem("prac-kanban"));
        const allCurrentProj = await getKanbanProject();

        const index = allCurrentProj.findIndex((obj => obj.id == project.id));

        allCurrentProj[index].members = [];
        project.members = [];
        otherMembers.forEach(m => {
            project.members.push(m);
            allCurrentProj[index].members.push(m);
        })
        await addKanpanProject(allCurrentProj);
        // localStorage.setItem("prac-kanban", JSON.stringify(allCurrentProj));
        setReload(true);
        clearErrors("email")
    }

    const addEmailMember = async (e) => {
        e.preventDefault();

        const inputEmail = document.getElementById('addEmail');
        const email = inputEmail.value;
        // let allCurrentProj = JSON.parse(localStorage.getItem("prac-kanban"));
        const allCurrentProj = await getKanbanProject();
        if (allCurrentProj.find(c => {
            if (c.members.includes(email)) {
                return true;
            }
            return false;
        })) {
            setError('email', {
                type: 'assign-member-error',
                message: 'Email have added to this project! Please enter an other email!'
            });
            return;
        }
        project.members.push(email);
        const index = allCurrentProj.findIndex((obj => obj.id == project.id));
        allCurrentProj[index].members.push(email);
        if (!authToken()) {
            navigate("/") // Redirect to login page
            return;
        }
        await addKanpanProject(allCurrentProj);
        // localStorage.setItem("prac-kanban", JSON.stringify(allCurrentProj));
        setReload(true);
        clearErrors("email")
    }

    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modalAssignMember">
                    <div className="modalHeader">
                        <h3 className="heading">Project: {project.title}</h3>
                    </div>
                    <h5 className="heading">List members: </h5>
                    <div className="modalContent">
                        {
                            project.members.map(member => (
                                <div className="modalActions">
                                    <div className="actionsContainer">
                                        <div className="member" key={member}>{member}</div>
                                        <button className="addBtn" data-removeemail={member} onClick={(e) => removeEmailMember(e)}>Remove</button>
                                    </div>
                                </div>

                            ))
                        }
                        <div style={{margin: 15}}>Please add the member's email here.</div>
                        <div className="addEmail">
                            <div className="actionsContainer">
                                <input type="text" name="text" placeholder="Add email" className="form-control addtxt" id='addEmail'
                                       {...register("email", {
                                           required: "Required",
                                           pattern: {
                                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                               message: "invalid email address"
                                           }
                                       })}
                                />
                                <button className="addBtn" onClick={(e) => addEmailMember(e)}>Add</button>
                            </div>
                            {errors.email && errors.email.message}
                        </div>
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            {/*<button className="addBtn" onClick={() => {setTotalAdd(totalAdd => totalAdd + 1)}}>Add more</button>*/}
                            <button
                                className="cancelBtn"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
