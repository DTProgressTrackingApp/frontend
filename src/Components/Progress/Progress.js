import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import './Progress.css';
const Progress = ({completed, incompleted, remain}) => {
    // const Progress = ({ cards, sumOfResults }) => {
    console.log("ProgessCompleted: " + completed);
    console.log("ProgessIncompleted: " + incompleted);
    const data = {
        labels: ["In Progress", "Completed", "Remaining"],
        datasets: [
            {
                label: "Progress",
                data: [incompleted, completed, remain],
                backgroundColor: ["rgb(255,165,0)", "rgb(127,255,0)", "rgb(220, 220, 220)"],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || "";
                        let value = context.raw;
                        if (label) {
                            label += ": ";
                        }
                        label += value + "%";
                        return label;
                    },
                },
            },
        },
    };
    console.log("data:", data);

    return (
        <div className="p-chart-container">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default Progress;
