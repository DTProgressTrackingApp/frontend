import React from "react";
import { Doughnut } from "react-chartjs-2";

import './Work_D_Chart.css';

const Work_D_Chart = () => {
    // const Work_D_Chart = ({ boardWeights }) => {
    // if (!boardWeights) {
    //     // Handle the case when boardWeights is undefined (loading state or error message)
    //     return <div>Loading...</div>; // You can replace this with an appropriate loading state or error message component
    // }

    // Rest of the component code
    const data = {
        labels: ['To-Do', 'In progress', 'Completed'],
        datasets: [
            {
                label: 'Work Distribution',
                data: [50,40,10],
                // data: boardWeights.map((board) => board.weightSum),
                backgroundColor: [
                    'rgb(253,142,142)',
                    'rgb(181,215,99)',
                    'rgb(0,93,162)',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="w-chart-container">
            <Doughnut data={data} />
        </div>
    );
};

export default Work_D_Chart;
