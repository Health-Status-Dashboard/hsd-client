//import React from "react";
import '../index.css';



//TODO make "any" here "Region" - should work but it doesn't
import { Region } from '../interfaces/Region';

export const RegionCard = (data: any) => {


    return (
        <div className="region-container">
            <div>
                <h2>{data.name}</h2>
            </div>
            <div>
                <h4>Population: {data.population}</h4>
            </div>
        </div>

    );
};







/*
<div>
                <h4>{Region.lifeExpectancy}</h4>
            </div>
*/