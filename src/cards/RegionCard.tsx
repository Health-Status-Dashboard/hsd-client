//import React from "react";
import '../index.css';
import { Region } from '../interfaces/Region';
//import { Link } from "react-router-dom";


//TODO make "any" here "Region" - should work but it doesn't
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

export default Region;






/*
<div>
                <h4>{Region.lifeExpectancy}</h4>
            </div>
*/