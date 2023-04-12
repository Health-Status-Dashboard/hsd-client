//import React from "react";
import '../index.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { IBar } from '../interfaces/IBar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type BarData = { data: IBar };

export const MiniBarCard = (data: BarData) => {
    var labels = data.data.labels
    var datasets = data.data.datasets
    var propData = {
        labels: labels,
        datasets: datasets
    }

    var options = {
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 50,
                    minRotation: 30,
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: data.data.title,
            }
        }
    }
    return (
        <Bar data={propData}
            height={900}
            width={800}
            options={options} />

    );
};





