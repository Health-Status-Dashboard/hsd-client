import * as React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
export default function TempPage() {

  /**
   * State values
   */
  const [dataFromBackend, setDataFromBackend] = React.useState<string>("");

  // Backend url (dev)
  const backendUrl = 'http://localhost:3001';
  // Backend url (production virtual machine)
  // const backendUrl = '/api';

  React.useEffect(() => {
    // Fetch jurisdictions
    //const getJurisdictionsUrl = `${backendUrl}/getCollection`
    const getJurisdictionsUrl = `http://localhost:3001/api/getStates`
    fetch(getJurisdictionsUrl)
      .then(response => response.json())
      .then(data => {
        setDataFromBackend(JSON.stringify(data));
      })
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  //Creating chart 
  //state labels
  const getlabels=()=> {
    
    var dataArr = [];
    try {
      dataArr = JSON.parse(dataFromBackend);
    } catch (error) {
      console.log(error)
    }

    let dataMap = new Map<string, number>();

    try {
      for (var i = 1; i < dataArr.length; i++){
        dataMap.set(dataArr[i].name, parseInt(dataArr[i].population));
      }

      dataMap= new Map([...dataMap.entries()].sort((a,b) => a[1]-b[1]));
      var states = Array.from(dataMap.keys());
      return states;
    } catch (error) {
      console.log(error)
    } 
  }
  const getPopulation=()=> {
    
    var dataArr = [];
    try {
      dataArr = JSON.parse(dataFromBackend);
    } catch (error) {
      console.log(error)
    }

    let dataMap = new Map<string, number>();

    try {
      for (var i = 1; i < dataArr.length; i++){
        dataMap.set(dataArr[i].name, parseInt(dataArr[i].population));
      }

      dataMap= new Map([...dataMap.entries()].sort((a,b) => a[1]-b[1]));
      var populations = Array.from(dataMap.values());

      return populations;
    } catch (error) {
      console.log(error)
    } 
  }

  const states = getlabels();
  const populations = getPopulation();

  //state population data
  var data = {
    labels: states,
    datasets: [
    {
      barThickness:4,
     
      label: 'Number of people',
      data: populations,
      borderColor: ['rgb(255, 99, 132)'],
      backgroundColor: ['rgba(255, 99, 132)'],
    }
    ]
    }
  
    //state population options
    var options =  {
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
              text: 'Population by US state',
            }
          }
  }

  return (
    <section>
      <h1>Health Status Dashboard</h1>
    <Bar 
        data={data}
        height={500}
        width={1200} 
        options={options}
    />
    </section>
  );
}