//import React from "react";
import '../index.css';
import { ISummary, Header } from '../interfaces/ISummary';

type SummaryData = { data: ISummary };

export const SummaryCard = (sumData: SummaryData) => {
    const descriptors = sumData.data.headers.map((h: Header) =>
        <div key={h.label}>
            <div key={h.label}>{h.label}: <strong>{h.value}</strong></div>
        </div >
    );
    return (
        <div>
            <div>
                <h4 className="header">{sumData.data.title}</h4>
            </div>
            <>
                <div>{descriptors}</div>
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