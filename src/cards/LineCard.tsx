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

import { Longitudinal } from '../interfaces/Longitudinal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type LongData = { data: Longitudinal };

export const LineCard = (data: LongData) => {
    console.log("in the card")
    console.log(data)
    const labels = data.data.x
    var longData = {
        labels,
        datasets: [
            {
                label: data.data.label,
                data: data.data.y,
                borderColor: [data.data.color],
                backgroundColor: [data.data.color],
            }
        ]
    }

    var options = {
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
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





