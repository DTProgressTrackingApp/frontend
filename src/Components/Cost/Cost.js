import React from "react";
import { Chart } from "react-chartjs-2";
import 'chart.js/auto';
import "./Cost.css";
import CardCost from "./CardCost.js";

import { useSelector } from 'react-redux';

const Cost = ({incurredCost,taskBudget, budget}) => {

    // const taskBudget = useSelector((state) => state.taskBudget);
    // const cic = useSelector((state) => state.cic);
    // console.log("budget cic:", cic);
    // console.log("todo budget:", props?.todo?.budget + ", incurred cost: " + props?.todo?.incurredCost );
    // const labels = ["Task Est. Budget", "Incurred Cost"];
    const data = {
        labels: ["Task Est. Budget", "Incurred Cost"],
        datasets: [
            {
                label: "Task Est. Budget",
                data: [taskBudget, 0],
                type: 'bar',
                backgroundColor: ['rgba(255, 99, 132, 0.5)'],
            },
            {
                label: "Budget Project",
                borderColor: "rgb(0,0,0)",
                type: 'line',
                data: [budget, budget],
                fill: false,
                backgroundColor: ["rgb(197,201,204)"],
            },
            {
                label: "Incurred Cost",
                data: [0, incurredCost],
                type: 'bar',
                backgroundColor: ['rgba(53, 162, 235, 0.5)'],
            },
        ]
    }

    return (
        <div className="chart-container">
            <Chart  type='bar' data={data} />
        </div>
    );
};

export default Cost;
