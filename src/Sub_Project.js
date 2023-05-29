import React from "react";
import './App.css';
import KanbanApp from './KanbanApp.js';
import Leftside from './Components/Leftside/Leftside.js';

function Sub_Project({ subProject, onBackButtonClick }) {
    return (
        <div className="Sub_Project">
            <div className="container">
                <h1 className="project_title">Sub Project {subProject.id}</h1>
                <button className="back_button" onClick={onBackButtonClick}><span>&#8680;</span></button>
                {/* Render the subproject page content */}
                        <Leftside/>
                        <KanbanApp/>

            </div>
        </div>
    );
}

export default Sub_Project;
