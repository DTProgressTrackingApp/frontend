import React, {useEffect, useState} from "react";
import './App.css';
import KanbanApp from './KanbanApp.js';
import Leftside from './Components/Leftside/Leftside.js';
import Project_title from './Components/Project_title.js';
import {AssignMemberModal} from "./Components/Modal/AssignMemberModal.js";
import {set} from "react-hook-form";

function Sub_Project({ subProject, onBackButtonClick, props }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [budget, setBudget] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [incompleted, setIncompleted] = useState(0);

    const [boards, setBoards] = useState(
        JSON.parse(localStorage.getItem("prac-kanban")) || []
    );

    useEffect(() => {
        console.log(boards)
        if(boards.length > 1)
            setIncompleted(boards[0].cards.length + boards[1].cards.length)

        if(boards.length > 2)
            setCompleted(boards[2].cards.length)

        console.log(completed, incompleted)
    }, [boards])

    const handleAddCard = () => {
        setCards([...cards, { weight: "", achievedWeight: "", result: 0 }]);
    };

    const handleBudgetChange = (b) => {
        setBudget(b)
    }

    const handleRemoveCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const handleCardChange = (index, updatedCard) => {
        const updatedCards = [...cards];
        updatedCards[index] = updatedCard;
        setCards(updatedCards);
    };

    const sumOfResults = cards.reduce(
        (total, card) => total + parseInt(card.result),
        0
    );

    return (
        <div className="Sub_Project">
            <div className="container scrollable">
                <div className="column-container">
                    <h2 className="project_title">{subProject.id + ' ' + subProject.title}</h2>
                    <Project_title {...props} budget={budget} setBudget={handleBudgetChange} />
                    <Leftside cards={cards} budget={budget} progress={{completed: completed, incompleted: incompleted}} />
                </div>
                <button className="assign_button" onClick={() => setIsOpen(true)}><span>Assign member</span></button>
                {isOpen && <AssignMemberModal project={subProject} setIsOpen={setIsOpen} />}
                <button className="back_button" onClick={onBackButtonClick}><span>&#8680;</span></button>
                <KanbanApp  />
            </div>
        </div>
    );
}

export default Sub_Project;
