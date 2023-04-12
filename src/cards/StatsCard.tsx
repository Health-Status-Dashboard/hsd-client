//import React from "react";
import '../index.css';
import { IStats } from '../interfaces/IStats';

type StatsData = { data: IStats };

export const StatsCard = (statsData: StatsData) => {
    const descriptors = statsData.data.stats.map((stat) =>
        <div key={stat.label} className="item">
            <br />
            <div className="row">
                <div className="col-5">
                    <h6 className="stat_val">{stat.value}</h6>
                </div>
                <div className="col-7">
                    <div key={stat.label}> {stat.label}</div>
                </div>
            </div>
        </div >
    );
    return (
        <div>
            <div>
                <h4 className="header">{statsData.data.title}</h4>
            </div>
            <>
                <div>{descriptors}</div>
            </>
        </div>
    )
}








