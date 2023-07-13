import React, {useState} from "react";
import "./AssignMemberModal.css";

export const AssignMemberModal = ({project, setIsOpen}) => {
    const [reload, setReload] = useState(false);

    const addEmailMember = (e) => {
        e.preventDefault();

        const inputEmail = document.getElementById('addEmail');
        const email = inputEmail.value;
        project.members.push(email);
        localStorage.setItem("prac-kanban", JSON.stringify(project));
        setReload(true);
        // e.target.value = "";
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
                            project.members.map((member) => (
                                <div className="member">{member}</div>
                            ))
                        }
                        <div style={{margin: 15}}>Please add the member's email here.</div>
                        <div className="addEmail">
                            <div className="actionsContainer">
                                <input type="text" name="text" placeholder="Add email" className="form-control addtxt" id='addEmail' />
                                <button className="addBtn" onClick={(e) => addEmailMember(e)}>Add</button>
                            </div>
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
