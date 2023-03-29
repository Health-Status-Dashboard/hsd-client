//import React from "react";
import '../index.css';
import { IStats } from '../interfaces/IStats';

type StatsData = { data: IStats };

export const StatsCard = (statsData: StatsData) => {
    const descriptors = statsData.data.stats.map((stat) =>
        <div key={stat.label} className="item">
            <br />
            <div className="row">
                <div className="col-4">
                    <h5>{stat.value}</h5>
                </div>
                <div className="col-8">
                    <h6 key={stat.label}> {stat.label}</h6>
                </div>
            </div>
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








