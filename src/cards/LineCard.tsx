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

export const LineCard = (data: LongData) => {
    const colors = ["rgb(16,44,76)"]
    const labels = data.data.x
    var longData = {
        labels,
        datasets: [
            {
                label: data.data.label,
                data: data.data.y,
                borderColor: [colors[0]],
                backgroundColor: [colors[0]],
            }
        ]
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
        <Line data={longData}
            height={500}
            width={800}
            options={options} />

    );
};





