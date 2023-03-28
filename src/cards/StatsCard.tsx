//import React from "react";
import '../index.css';
import { Stats } from '../interfaces/Stats';

type StatsData = { data: Stats };

export const StatsCard = (statsData: StatsData) => {
    const descriptors = statsData.data.stats.map((stat) =>
        <div key={stat.label} className="item">
            <br />
            <h6 key={stat.label}>{stat.value} {stat.label}</h6>
        </div >
    );
    return (
        <div>
            <div>
                <h4>{statsData.data.title}</h4>
            </div>
            <>
                <div>{descriptors}</div>
            </>
        </div>
    )
}








