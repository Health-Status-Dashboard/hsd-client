//import React from "react";
import '../index.css';
import { Region } from '../interfaces/Region';
//import { Link } from "react-router-dom";


//TODO make "any" here "Region" - should work but it doesn't
export const RegionCard = (data: any) => {


    return (
        <div className="region-container">
            <div>
                <h4>{data.name}</h4>
            </div>
            <div>
                <h4>{data.population}</h4>
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