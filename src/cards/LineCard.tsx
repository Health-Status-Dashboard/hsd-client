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

//TODO make "any" here "Region" - should work but it doesn't
import { Region } from '../interfaces/Region';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineCard = (region: any) => {
    //
    //
    //
    const labels = region.data.lifeExpectancy.years
    var regionData = {
        labels,
        datasets: [
            {
                label: 'US Life Expectancy',
                data: region.data.lifeExpectancy.ages,
                borderColor: ['rgb(16,44,76)'],
                backgroundColor: ['rgba(16,44,76)'],
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
                text: 'US Life Expectancy (1970 - 2020)',
            }
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                </div>
                <div className="col-8">
                    <div className="region-container">
                        <div>
                            <h4>{region.data.name}</h4>
                        </div>
                        <div>
                            <h6>Population: {region.data.population}</h6>
                        </div>
                        <Line data={regionData}
                            height={500}
                            width={800}
                            options={options} />
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>

    );
};







/*
<div>
                <h4>{Region.lifeExpectancy}</h4>
            </div>

            
      
*/