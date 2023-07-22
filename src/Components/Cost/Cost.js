import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import "./Cost.css";
import CardCost from "./CardCost.js";

import { useSelector } from 'react-redux';

const Cost = ({incurredCost, budget}) => {

    const taskBudget = useSelector((state) => state.taskBudget);
    const cic = useSelector((state) => state.cic);
    console.log("budget cic:", cic);
    // console.log("todo budget:", props?.todo?.budget + ", incurred cost: " + props?.todo?.incurredCost );
    // console.log("progress budget:", props?.progress?.budget + ", incurred cost: " + props?.progress?.incurredCost );
    // console.log("completed budget:", props?.completed?.budget + ", incurred cost: " + props?.completed?.incurredCost );
    const labels = ["Task Est. Budget", "Incurred Cost"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Budget-Incurred cost",
                borderColor: "rgb(0,0,0)",
                data: [budget, incurredCost],
                type: "line",
                backgroundColor: ["rgb(197,201,204)"],
            }
        ],
    };

    return (
        <div className="chart-container">
            <Bar data={data} />
        </div>
    );
};

export default Cost;
