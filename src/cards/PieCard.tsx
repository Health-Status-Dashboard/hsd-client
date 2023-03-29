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

import { Proportional } from '../interfaces/IProportional';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

type propData = { data: Proportional };

export const PieCard = (myData: propData) => {
    var labels = myData.data.labels
    var datasets = myData.data.datasets
    var propData = {
        labels: labels,
        datasets: datasets
    }
    var options = {
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
            height={800}
            width={800}
            options={options} />

    );
};





