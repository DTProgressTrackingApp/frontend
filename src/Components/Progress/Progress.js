import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import './Progress.css';
const Progress = () => {
    // const Progress = ({ cards, sumOfResults }) => {
    const data = {
        labels: ["Weighted", "Remaining"],
        datasets: [
            {
                label: "Progress",
                data: [50,40,10],
                backgroundColor: ["rgb(80,175,246)", "rgb(220, 220, 220)", "rgb(120,217,170)"],
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
