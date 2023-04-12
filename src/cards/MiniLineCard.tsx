//import React from "react";
import '../index.css';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { ILongitudinal } from '../interfaces/ILongitudinal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


type LongData = { data: ILongitudinal };

export const MiniLineCard = (data: LongData) => {
    var labels = data.data.labels
    var datasets = data.data.datasets
    var propData = {
        labels: labels,
        datasets: datasets
    }

    var options = {
        responsive: true,
        maintainAspectRatio: true,
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
        <Line data={propData}
            height={800}
            width={800}
            options={options} />

    );
};





