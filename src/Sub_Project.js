import React, {useEffect, useState} from "react";
import './App.css';
import KanbanApp from './KanbanApp.js';
import Leftside from './Components/Leftside/Leftside.js';
import Project_title from './Components/Project_title.js';
import {AssignMemberModal} from "./Components/Modal/AssignMemberModal.js";
import {Logout} from "./Components/Auth/Logout.js";
import {getProjectValues} from "./Service/FirestoreService.js";

function Sub_Project({ subProject, onBackButtonClick, currentUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjectValues();
            return data;
        }
        fetchData().then(data => {
                console.log("Project value: " + JSON.stringify(data));
                if (data) {
                    setBudget(data.budget);
                } else {
                    setBudget(0);
                }
            }
        );
    }, [])

    const [completed, setCompleted] = useState(0);
    const [incompleted, setIncompleted] = useState(0);
    const [todoWeight, setTodoWeight] = useState(0);
    const [progressWeight, setProgressWeight] = useState(0);
    const [finishWeight, setFinishWeight] = useState(0);
    const [incurredCost, setIncurredCost] = useState(0);
    const [project, setProject] = useState(subProject);

    useEffect(() => {
        console.log("Init board: " + JSON.stringify(project));
        let inCompletedPercent = 0;
        let completedPercent = 0;
        let todoWeightPercent = 0;
        let progressWeightPercent = 0;
        let finishWeightPercent = 0;
        let incurredCostPercent = 0;

        if (project.todoTask) {
            project.todoTask.forEach((card) => {
                if (card.weight) {
                    todoWeightPercent += parseInt(card.weight);
                }
            })
        }

        if (project.progressTask) {
            project.progressTask.forEach((card) => {
                if (card.achievedWeight && card.weight) {
                    inCompletedPercent += (card.achievedWeight * card.weight) / 100;
                }
                if (card.weight) {
                    progressWeightPercent += parseInt(card.weight);
                }
                if (card.cic) {
                    incurredCostPercent += parseInt(card.cic);
                }
            })
        }
        if (project.finishTask) {
            project.finishTask.forEach((card) => {
                if (card.achievedWeight && card.weight) {
                    completedPercent += (card.achievedWeight * card.weight) / 100;
                }
                if (card.weight) {
                    finishWeightPercent += parseInt(card.weight);
                }
                if (card.cic) {
                    incurredCostPercent += parseInt(card.cic);
                }
            })
        }
        setIncompleted(inCompletedPercent);
        setCompleted(completedPercent);
        setTodoWeight(todoWeightPercent);
        setProgressWeight(progressWeightPercent);
        setFinishWeight(finishWeightPercent);
        setIncurredCost(incurredCostPercent);

        console.log("completed " + completedPercent + ",inCompleted: " + inCompletedPercent + ",todoWeight: " + todoWeightPercent
            + ",progressWeight: " + progressWeightPercent + ",finishWeight: " + finishWeightPercent + ",incurredCost: " + incurredCostPercent);
    }, [project])

    const handleBudgetChange = (b) => {
        setBudget(b)
    }

    return (
        <div className="Sub_Project">
            <div className="container scrollable">
                <div className="column-container">
                    <h2 className="project_title">{subProject.id + ' ' + subProject.title}</h2>
                    <Project_title budget={budget} setBudget={handleBudgetChange} />
                    <Leftside cards={cards} incurredCost={incurredCost} budget={budget} progress={{completed, incompleted, todoWeight, progressWeight, finishWeight}} />
                </div>
                {
                    currentUser.role == "MANAGER" && <button className="assign_button" onClick={() => setIsOpen(true)}><span>Assign member</span></button>
                }
                {isOpen && <AssignMemberModal project={subProject} setIsOpen={setIsOpen} />}
                <Logout />
                <button className="back_button" onClick={onBackButtonClick}><span>&#8680;</span></button>
                <KanbanApp currentProject={subProject} setProject={project => setProject(project)} />
            </div>
        </div>
    );
}

export default Sub_Project;
