import React, {useEffect, useState} from "react";

import Card from "../Card/Card.js";
import Editable from "../Editabled/Editable.js";

import "./Board.css";

function Board(props) {
    const [reload, setReload] = useState(false);

    const submit = (value) => {
        props.addCard(value);
        setReload(true);
    }

    return (
        <div className="board">
            <div className="board_header">
                {props.children}
            </div>
            <div className="board_cards custom-scroll">
                {props.task?.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        updateCard={props.updateCard}
                        removeCard={props.removeCard}
                        totalWeight={props.totalWeight}
                        setTotalWeight={props.setTotalWeight}
                        shiftSubTaskStatus={props.shiftSubTaskStatus}
                    />
                ))}
                <Editable
                    text="+ Add Task"
                    placeholder="Enter Card Title"
                    displayClass="board_add-card"
                    editClass="board_add-card_edit"
                    onSubmit={(value) => submit(value)}
                />
            </div>
        </div>
    );
}

export default Board;
