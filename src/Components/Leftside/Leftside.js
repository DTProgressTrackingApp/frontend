import React, { useState } from "react";
import "./Leftside.css";
import Progress from "../Progress/Progress.js";
import Cost from "../Cost/Cost.js";
import Chart_calc from "../Progress/Chart_calc.js";
import Work_D_Chart from "../Work_D_Chart/Work_D_Chart.js";
import {Chart} from "react-chartjs-2";

// function ctx() {
//
// }
//
// const chart = new Chart(ctx, {
//     type: 'line',
//     data: this.data,
//     options: {
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Custom Chart Title'
//             }
//         }
//     }
// });



const Leftside = ({incurredCost, taskBudget, budget, progress}) => {

    // const [completed, setCompleted] = useState(progress.completed);
    // const [incompleted, setIncompleted] = useState(progress.incompleted);
    const remainProgress = 100 - (progress.incompleted + progress.completed);
    const remainWorkDChart = 100 - (progress.todoWeight + progress.progressWeight + progress.finishWeight);
    return (

    <div className="charts-container">
            <div className="chart-container">
                {/*<div className="title">Progress</div>*/}
                <div className="C_body">
                    <h3 className="title">Progress</h3>
                    <Progress remain={remainProgress} incompleted={progress.incompleted} completed={progress.completed}/>
                    {/*<Work_D_Chart remain={remainWorkDChart} todoWeight={progress.todoWeight} progressWeight={progress.progressWeight} finishWeight={progress.finishWeight}/>*/}
                    {/*<Cost incurredCost={incurredCost} taskBudget={taskBudget} budget={budget}  />*/}
                </div>
            </div>
        <div className="chart-container">
            {/*<div className="title">Work distribution</div>*/}
            <div className="C_body">
                <h3 className="title">Work distribution</h3>
                <Work_D_Chart remain={remainWorkDChart} todoWeight={progress.todoWeight} progressWeight={progress.progressWeight} finishWeight={progress.finishWeight}/>
            </div>
        </div>
            <div className="chart-container">
                {/*<div className="title">Finance</div>*/}
                <div className="C_body">
                    <h3 className="title">Finance</h3>
                    <Cost incurredCost={incurredCost} taskBudget={taskBudget} budget={budget}  />
                </div>
            </div>
    </div>
    );
};


export default Leftside;
