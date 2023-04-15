//import React from "react";
import '../index.css';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { IProportional } from '../interfaces/IProportional';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

type propData = { data: IProportional };

export const PieCard = (myData: propData) => {
    var labels = myData.data.labels
    var datasets = myData.data.datasets
    var propData = {
        labels: labels,
        datasets: datasets
    }
    var options = {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: myData.data.title,
            }
        }
    }
    return (
        <Pie
            data={propData}
            height={400}
            width={400}
            options={options} />

    );
};





