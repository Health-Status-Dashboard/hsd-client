//import React from "react";
import '../index.css';
import { Line, Bar } from 'react-chartjs-2';
import { colors } from '../colors/colors'
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

import { ILine } from '../interfaces/ILine';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


type LongData = { data: ILine };

export const SingleLineCard = (data: LongData) => {
    const labels = data.data.x
    var longData = {
        labels,
        datasets: [
            {
                label: data.data.label,
                data: data.data.y,
                borderColor: [colors.mitreBlue],
                backgroundColor: [colors.mitreBlue],
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





