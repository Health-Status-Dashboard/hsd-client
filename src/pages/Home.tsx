

import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { SummaryCard } from '../cards/SummaryCard'
import { StatsCard } from '../cards/StatsCard'
import { LineCard } from '../cards/LineCard'
import { PieCard } from '../cards/PieCard'
import { BarCard } from '../cards/BarCard'
import { SingleLineCard } from '../cards/SingleLineCard'

import { ILongitudinal } from '../interfaces/ILongitudinal';
import { ISummary } from '../interfaces/ISummary';
import { IStats } from '../interfaces/IStats';
import { IProportional } from '../interfaces/IProportional';
import { IBar } from '../interfaces/IBar';
import { ILine } from '../interfaces/ILine';

import { initLifeExpectancy, getLifeExpectancy, initAlcoholTobaccoData, getAlcoholTobaccoData, initDCData, getDCData, 
    initNAWData, getNAWData, initUSPopulationData, getUSPopulationData, initCDSummaryData, getCDSummaryData, getWeightSummary, 
    initUninsuredSummary, getUninsuredSummary, initUninsuredByEducation,getUninsuredByEducation, initUninsuredByAge, getUninsuredByAge,
    initUninsuredBySubgroup, getUninsuredBySubgroup} from '../endpoints/serverURLs'
import { colors, gradient } from '../colors/colors'


//

async function initData(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
        var response = await fetch(initLifeExpectancy);
        response = await fetch(initAlcoholTobaccoData);
        response = await fetch (initDCData); //TODO resaves
        const { status } = response;
        return status;
    } catch (err) {
        // handle error
        console.error(err);
    }
}


export default function Home() {

//general Us population data
    const [populationData, savePopulationData] = React.useState({
        title: "",
        headers: []
    });
    React.useEffect(() => {
        fetch(getUSPopulationData)
            .then(response => response.json())
            .then(data => {
                savePopulationData(data[0]);
            })
    }, []);


//life expectancy data section
    const [lifeExpectancy, saveLifeExpectancy] = React.useState({
        title: '',
        label: '',
        x: [],
        y: [],
        color: colors.mitreBlue
    });
    React.useEffect(() => {
        fetch(getLifeExpectancy)
            .then(response => response.json())
            .then(data => {
                saveLifeExpectancy(data[0]);
            })
    }, []);

//alcohol and tobacco data section
    const [alcoholDataset, saveAlcoholData] = React.useState({
        title: "",
        stats: []
    });
    React.useEffect(() => {
        fetch(getAlcoholTobaccoData)
            .then(response => response.json())
            .then(data => {
                saveAlcoholData(data[0]);
            })
    }, []);
    
//death causes data section

    const [causeOfDeathSummary, savecauseOfDeathSummary] = React.useState({
        title: "",
        headers: [],
    });
    React.useEffect(() => { 
        fetch(getCDSummaryData)
            .then(response => response.json())
            .then(data => {
                savecauseOfDeathSummary(data[0]);
            })
    }, []);

    const [DCDataset, saveDCData] = React.useState({
        title: "",
        labels: [],
        datasets: []
    });
    React.useEffect(() => { 
        fetch(getDCData)
            .then(response => response.json())
            .then(data => {
                var barChartColors = Object.values(colors);
                for (var i = 0; i < data[0].datasets.length; i++){
                    data[0].datasets[i].backgroundColor= barChartColors[i];
                    data[0].datasets[i].borderColor = barChartColors[i];
                    data[0].datasets[i].borderWidth= 1;
                }
                saveDCData(data[0]);
            })
    }, []);

//nutrition, activity and weight data section

    const [weightSummary, saveWeightSummary] = React.useState({
        title: "",
        headers: [],
    });
    React.useEffect(() => { 
        fetch(getWeightSummary)
            .then(response => response.json())
            .then(data => {
                saveWeightSummary(data[0]);
            })
    }, []);


    const [NAWDataset, saveNAWData] = React.useState({
        title: '',
        labels: [],
        datasets: []
    });
    React.useEffect(() => { 
        fetch(getNAWData)
            .then(response => response.json())
            .then(data => {
                var dataObj = data[0];
                data[0].datasets[0].backgroundColor= [
                    colors.vermilion,
                    colors.saffron,
                    colors.green,
                    colors.mitreDarkBlue];
                data[0].datasets[0].borderColor= [
                    colors.vermilion,
                    colors.saffron,
                    colors.green,
                    colors.white];
                data[0].datasets[0].borderWidth= 0;
                saveNAWData(dataObj);
            })
    }, []);

//uninsured population section

const [uninsuredSummaryData, saveUninsuredSummary] = React.useState({
    title: "",
    headers: [],
});
React.useEffect(() => { 
    fetch(getUninsuredSummary)
        .then(response => response.json())
        .then(data => {
            saveUninsuredSummary(data[0]);
        })
}, []);


const [uninsuredByEducationData, saveUninsuredByEducationData] = React.useState({
    title: "",
    labels: [],
    datasets: []
});
React.useEffect(() => { 
    fetch(getUninsuredByEducation)
        .then(response => response.json())
        .then(data => {
            const chosenColors = [colors.black, colors.mitreBlue, colors.white, colors.mitreYellow];

            for (var i = 0; i < chosenColors.length; i++){
                data[0].datasets[i].backgroundColor= chosenColors[i];
                data[0].datasets[i].borderColor= 'rgba(16,44,76,0.8)';
                data[0].datasets[i].borderWidth= 1;
            }
            saveUninsuredByEducationData(data[0]);
        })
}, []);
const [uninsuredByAgeData, saveUninsuredByAgeData] = React.useState({
    title: "",
    labels: [],
    datasets: []
});
React.useEffect(() => { 
    fetch(getUninsuredByAge)
        .then(response => response.json())
        .then(data => {
            const chosenColors = [colors.black, colors.mitreBlue, colors.white, colors.mitreYellow];

            for (var i = 0; i < chosenColors.length; i++){
                data[0].datasets[i].backgroundColor= chosenColors[i];
                data[0].datasets[i].borderColor= 'rgba(16,44,76,0.8)';
                data[0].datasets[i].borderWidth= 1;
            }
            saveUninsuredByAgeData(data[0]);
        })
}, []);

const [uninsuredBySubgroupData, saveUninsuredBySubgroupData] = React.useState({
title: '',
    labels: [],
    datasets: []
});
React.useEffect(() => { 
    fetch(getUninsuredBySubgroup)
        .then(response => response.json())
        .then(data => {
            const chosenColors = [colors.black, colors.cerise, colors.mitreBlue];

            for (var i = 0; i < chosenColors.length; i++){
                data[0].datasets[i].backgroundColor= chosenColors[i];
                data[0].datasets[i].borderColor= chosenColors[i];
            }
            saveUninsuredBySubgroupData(data[0]);
        })
}, []);


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MITRE | HSD</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/regions">Regions</Nav.Link>
                        <Nav.Link href="#risks">Risks</Nav.Link>
                        <Nav.Link href="#systems">Health Systems</Nav.Link>

                    </Nav>
                    <Nav className="ml-auto">
                        <Button onClick={initData} variant="light" style={{ marginLeft: "auto" }}>Reset</Button>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <h2 className="title" >US Health Status Dashboard</h2>
            <br />
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div className="region-container">
                                <StatsCard data={alcoholDataset} />
                                <br/>
                                <p className='source_small_font'>DPH Public Inquiries- CDC Chronic Data- Alcohol; Tobacco. Sourced from: http://www.cdc.gov/nccdphp/dph/. </p>
                            </div>
                        </div>


                        <div className="col-6 align-items-center">
                            <div className="region-container">
                                <div className="summ-space">
                                    <SummaryCard data={populationData} />
                                </div>
                                <SingleLineCard data={lifeExpectancy} />
                                <br/>
                                <p className='source_small_font'>Population, fertility datasets: US Census Data 2021, SOURCE#2; Life Expectancy Dataset: National Center for Health Statistics. NCHS - Death rates and life expectancy at birth. Available from https://data.cdc.gov/d/w9j2-ggv5.</p>
                            </div>
                        </div>


                        <div className="col-3">
                            <div className="region-container">
                                <SummaryCard data={weightSummary} />
                                <br />
                                <PieCard data={NAWDataset} />
                                <br />
                                <p className='source_small_font'>SOURCE 1; DPH Public Inquiries- CDC Chronic Data- US Chronic Disease Indicators (CDI). Sourced from: 	http://www.cdc.gov/nccdphp/dph/. </p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="region-container">
                                <SummaryCard data={causeOfDeathSummary} />
                                <BarCard data={DCDataset} />
                                <br/>
                                <p className='source_small_font'>National Center for Health Statistics. Monthly Provisional Counts of Deaths by Select Causes, 2020-2023. Available from https://data.cdc.gov/d/9dzk-mvmi.</p>

                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="region-container">
                                <SummaryCard data={uninsuredSummaryData} />
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-7">
                            <div className="region-container">
                                <div className="summ-space">
                                </div>
                                <LineCard data={uninsuredBySubgroupData} />
                                <br/>
                                <p className='source_small_font'>National Center for Health Statistics. Indicators of Health Insurance Coverage at the Time of Interview. Available from: https://data.cdc.gov/d/jb9g-gnvr.</p>
                            </div>
                        </div>

                        <div className="col-5">
                            <div className="region-container">
                                <BarCard data={uninsuredByEducationData} />
                                <BarCard data={uninsuredByAgeData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="foot">
            </div>
        </>
    );

}