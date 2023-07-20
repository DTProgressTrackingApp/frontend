import React, { useEffect, useState } from "react";
// import Work_D_Chart from "./Components/Work_D_Chart/Work_D_Chart.js";
import Board from "./Components/Board/Board.js";
import { getBoardWeightSum } from "./Components/Work_D_Chart/helpers.js";

import "./KanbanApp.css";
import Editable from "./Components/Editabled/Editable.js";
import {authToken} from "./Service/AuthService.js";
import {useNavigate} from "react-router-dom";

function KanbanApp() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState(() => {
    return JSON.parse(localStorage.getItem("prac-kanban")) || []
  });
  // const [incompleted, setIncompleted] = useState(0);
  // const [completed, setCompleted] = useState(0)
  //
  // if(boards.length > 1)
  //   setIncompleted(boards[0].length + boards[1].length)
  //
  // if(boards.length > 2)
  //   setCompleted(boards[2])

  useEffect(() => {
    // only runs once
    console.log('Run auth token once');
    if (!authToken()) {
      navigate("/") // Redirect to login page
    }
  }, []);

  const addCardHandler = (id, title) => {
    console.log("addCardHandle: " + id + ", title: " + title);
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  const [weight, setWeight] = useState("");

  const updateWeight = (value) => {
    setWeight(value);
  };

  const getBoardWeightSum = (board) => {
    let sum = 0;
    for (const card of board.cards) {
      sum += parseInt(card.weight) || 0;
    }
    return sum;
  };

  const boardWeights = boards.map((board) => ({
    id: board.id,
    weightSum: getBoardWeightSum(board),
  }));


  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  return (
      <div className="kapp">
        <div className="app_boards_container">
          <div className="app_boards">
            <Board
                key={boards[0]?.id}
                board={boards[0]}
                addCard={addCardHandler}
                removeCard={removeCard}
                updateCard={updateCard}
                weight={weight}
                updateWeight={updateWeight}
            >
              <h2>To-do</h2>
            </Board>
            <Board
                key={boards[1]?.id}
                board={boards[1]}
                addCard={addCardHandler}
                removeCard={removeCard}
                updateCard={updateCard}
                weight={weight}
                updateWeight={updateWeight}
            >
              <h2>In progress</h2>
            </Board>
            <Board
                key={boards[2]?.id}
                board={boards[2]}
                addCard={addCardHandler}
                removeCard={removeCard}
                updateCard={updateCard}
                weight={weight}
                updateWeight={updateWeight}
            >
              <h2>Completed</h2>
            </Board>
            {/*<Work_D_Chart boardWeights={boardWeights} weight={weight} />*/}

          </div>
        </div>
      </div>
  );
}

export default KanbanApp;
