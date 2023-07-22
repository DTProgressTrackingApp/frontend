import React, {useState} from "react";
import {Clock, MoreHorizontal} from "react-feather";

import Dropdown from "../Dropdown/Dropdown.js";
import CardInfo from "./CardInfo/CardInfo.js";

import "./Card.css";

function Card(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [card, setCard] = useState(props.card);

    const { id, title, startDate, subTasks, kpi, kpiDesc,  taskBudget, cic, weight,achievedWeight, endDate, actualStartDate,actualEndDate } = card;

    const formatDate = (value) => {
        if (!value) return "";
        const date = new Date(value);
        if (!date) return "";

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        return `${day} ${month}`;
    };

    const updateCard = (card) => {
        console.log("UpdateCard@Card.js: " + JSON.stringify(card));
        props.updateCard(card);
        setCard(card);
    }


    return (
        <>
            {showModal && (
                <CardInfo
                    onClose={() => {
                        setShowModal(false);
                        setReload(true);
                    }}
                    card={props.card}
                    updateCard={(card) => updateCard(card)}
                />
            )}
            <div
                className="card"
                // draggable
                // onDragEnd={() => props.dragEnded(props.boardId, id)}
                // onDragEnter={() => props.dragEntered(props.boardId, id)}
                onClick={() => setShowModal(true)}
            >
                <div className="card_top">
                    <div className="card_title">{title}</div>
                    <div
                        className="card_top_more"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowDropdown(true);
                        }}
                    >
                        <MoreHorizontal />
                        {showDropdown && (
                            <Dropdown
                                class="board_dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => props.removeCard(id)}>
                                    Delete Card
                                </p>
                            </Dropdown>
                        )}
                    </div>
                </div>

                {kpi && kpiDesc &&(
                    <div className="card_info">
                        <span className="card_info_label">KPI:</span>
                        <span className="card_info_value">{kpi}</span>
                        <span className="card_info_value" style={{marginLeft:'10px'}}>{kpiDesc}</span>
                    </div>
                )}


                <div className="card_info">
                    {taskBudget && (<div className="card_info_item">
                        <span className="card_info_label">Budget:{taskBudget && <span className="card_info_value" >{taskBudget} LKR</span>}</span>
                    </div>)}
                    {cic && (<div className="card_info_item" >
                        <span className="card_info_label" style={{marginLeft:'35px'}}>Current incurred cost: {cic && <span className="card_info_value" style={{marginLeft:'5px'}}>{cic} LKR</span>}</span>
                    </div>)}

                </div>


                <div className="card_info">
                    {weight && (<div className="card_info_item">
                        <span className="card_info_label">Weight:{weight && <span className="card_info_value" style={{marginLeft:'5px'}}>{weight}%</span>}</span>
                    </div>)}
                    {achievedWeight && (<div className="card_info_item" >
                        <span className="card_info_label" style={{marginLeft:'30px'}}>Achieved Weight: {achievedWeight && <span className="card_info_value" style={{marginLeft:'5px'}}>{achievedWeight}%</span>}</span>
                    </div>)}

                </div>




                <div >

                    <div className="card_dates">
                        {startDate && (
                            <p className="card_footer_item">
                                <h7>Start date: </h7>
                                <Clock className="card_footer_icon" />
                                {formatDate(startDate)}
                            </p>
                        )}
                        {actualStartDate && (
                            <p className="card_footer_item">
                                <h7>Actual Start date: </h7>
                                <Clock className="card_footer_icon" />
                                {formatDate(actualStartDate)}
                            </p>
                        )}
                    </div>

                    <div className="card_dates">
                        {endDate && (
                            <p className="card_footer_item" >
                                <h7>End date: </h7>
                                <Clock className="card_footer_icon" />
                                {formatDate(endDate)}
                            </p>
                        )}
                        {actualEndDate && (
                            <p className="card_footer_item" style={{ display: "flex"}}>
                                <h7>Actual End date: </h7>
                                <Clock className="card_footer_icon" />
                                {formatDate(actualEndDate)}
                            </p>
                        )}
                    </div>


                    {subTasks && subTasks.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", marginTop: "5px", fontSize: '12px', fontWeight: 'bold' }}>
                            <span style={{ marginRight: "4px" }}>Sub tasks:</span>
                            <p className="card_footer_item" style={{ fontSize: '10px', background:'none'}} >
                                {subTasks.length}
                            </p>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
}
export default Card;
