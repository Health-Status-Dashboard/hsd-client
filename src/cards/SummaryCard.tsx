//import React from "react";
import '../index.css';
import { Summary } from '../interfaces/Summary';

type SummaryData = { data: Summary };

export const SummaryCard = (sumData: SummaryData) => {
    return (
        <div>
            <div>
                <h4>{sumData.data.title}</h4>
            </div>
            <>
                {sumData.data.population !== undefined && (
                    <div>
                        <h6>Population: {sumData.data.population}</h6>
                    </div>

                )}
                {sumData.data.fertility !== undefined && (
                    <div>
                        <h6>Fertility Rate: <span className="red">{sumData.data.fertility}</span></h6>
                    </div>

                )}
            </>
        </div>
    )
}










/*

if (sumData.data.population !== undefined) {
        return (
        )
    }


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
                        <div>
                            <h6>Fertility Rate: <span className="red">1.754</span></h6>
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
*/








/*
<div>
                <h4>{Region.lifeExpectancy}</h4>
            </div>

            
      
*/