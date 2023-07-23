import React, { useState } from "react";
import "./Leftside.css";
import Progress from "../Progress/Progress.js";
import Cost from "../Cost/Cost.js";
import Chart_calc from "../Progress/Chart_calc.js";
import Work_D_Chart from "../Work_D_Chart/Work_D_Chart.js";

const Leftside = ({incurredCost, taskBudget, budget, progress}) => {

    // const [completed, setCompleted] = useState(progress.completed);
    // const [incompleted, setIncompleted] = useState(progress.incompleted);
    const remainProgress = 100 - (progress.incompleted + progress.completed);
    const remainWorkDChart = 100 - (progress.todoWeight + progress.progressWeight + progress.finishWeight);
    return (

    <div>
            <div>
                <div className="title">Progress</div>
                <div className="C_body">
                    <Progress remain={remainProgress} incompleted={progress.incompleted} completed={progress.completed}/>
                </div>
            </div>
        <div>
            <div className="title">Work distribution</div>
            <div className="C_body">
                <Work_D_Chart remain={remainWorkDChart} todoWeight={progress.todoWeight} progressWeight={progress.progressWeight} finishWeight={progress.finishWeight}/>
            </div>
        </div>
            <div>
                <div className="title">Finance</div>
                <div className="C_body">
                    <Cost incurredCost={incurredCost} taskBudget={taskBudget} budget={budget}  />
                </div>
            </div>
        </div>
    );
};


export default Leftside;
