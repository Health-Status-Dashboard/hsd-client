// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// export default function TempPage() {
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );


//   /**
//    * State values
//    */
//    const [dataFromBackend, setDataFromBackend] = React.useState<string>("");
   
//   const backendUrl = 'http://localhost:3001';

//   //state labels
//   const getlabels=()=> {
//     var dataArr = [];

//     try {
//       dataArr = JSON.parse(dataFromBackend); 
//     } catch (error) {
//       console.log(error)
//     }

//     var states = [];

//     try {
//       for (var i = 0; i < dataArr[0].stateBasedData.length; i++){
//         states.push(dataArr[0].stateBasedData[i].state);
        
//       }
//       return states;
//     } catch (error) {
//       console.log(error)
//     }
    
//   }

//   //total life expectancies
//   const getlifeexp=(props: string)=> {
//     var dataArr = [];

//     try {
//       dataArr = JSON.parse(dataFromBackend);  
//     } catch (error) {
//       console.log(error)
//     }

//     var leList = [];

//     try{
//       if (props === "Total"){
//         for (var i = 0; i < dataArr[0].stateBasedData.length; i++){
//           var row = dataArr[0].stateBasedData[i].categories[0].lifeExpectancy.sex[0].Total;
//           leList.push(row)
//         }
//       } 
//       if (props === "Female"){
//         for (var i = 0; i < dataArr[0].stateBasedData.length; i++){
//           var row = dataArr[0].stateBasedData[i].categories[0].lifeExpectancy.sex[2].Female;
//           leList.push(row)
//         }
//       }
//         if (props === "Male"){
//           for (var i = 0; i < dataArr[0].stateBasedData.length; i++){
//             var row = dataArr[0].stateBasedData[i].categories[0].lifeExpectancy.sex[1].Male;
//             leList.push(row)
//           }
//         }
//     } catch (error) {
//         console.log(error)    
//       }
//     return leList;
//   }


//   React.useEffect(() => {
//     // Fetch jurisdictions
//     const getJurisdictionsUrl = `${backendUrl}/api/getCollection` //DOES RETURN DATA (last api call did not)
//     //const getJurisdictionsUrl = '/api/getCollection'
//     fetch(getJurisdictionsUrl)
//       .then(response => response.json())
//       .then(data => {
//         setDataFromBackend(JSON.stringify(data));
//       })
//   }, []);
  

//   //life expectancy chart data
//   var data = {
//     labels: getlabels(),
//     datasets: [
//     {
//       barThickness:4,
     
//       label: 'Total Average Years',
//       data: getlifeexp("Total"),
//       borderColor: ['rgb(255, 99, 132)'],
//       backgroundColor: ['rgba(255, 99, 132)'],
//     },
//     {
//       barThickness:4,
     
//       label: 'Female Average years',
//       data: getlifeexp("Female"),
//       borderColor: ['rgba(53, 162, 235)'],
//       backgroundColor: ['rgba(53, 162, 235)'],
//     },
//     {
//       barThickness:4,
     
//       label: 'Male Average years',
//       data: getlifeexp("Male"),
//       borderColor: ['rgb(75, 192, 192)'],
//       backgroundColor: ['rgb(75, 192, 192)'],
//     },
//     ]
//     }
    
//      var options = {
//       indexAxis: 'y' as const,
//       elements: {
//         bar: {
//           borderWidth: 3,
//         },
//       },
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'right' as const,
//         },
//         title: {
//           display: true,
//           text: 'Life Expectancy by state',
//         },
//       },
//     };
    
//   return <div>
    
//     <Bar 
//         data={data}
//         height={800}
//         width={800} 
//         options={options}
//     />
//     </div>
// }







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

  interface State {
    _id: string
    name: string
    population: string
    code: string
  }

  /**
   * State values
   */
  //const [dataFromBackend, setDataFromBackend] = React.useState<string>("");
  const [dataFromBackend, setDataFromBackend] = React.useState<Array<State>>([]);


  // Backend url (dev)
  const backendUrl = 'http://localhost:3001';
  // Backend url (production virtual machine)
  // const backendUrl = '/api';

  React.useEffect(() => {
    // Fetch jurisdictions
    //const getJurisdictionsUrl = `${backendUrl}/getCollection`
    //const getJurisdictionsUrl = '/api/getStates'


    //const getJurisdictionsUrl = 'http://localhost:3001/api/getStates'
    const getJurisdictionsUrl = `/api/getStates`
    fetch(getJurisdictionsUrl)
      .then(response => response.json())
      .then(data => {
        console.log('heres the data for the states', data)
        setDataFromBackend(data);
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
  const getlabels = () => {

    var dataArr: Array<State> = [];
    try {
      dataArr = dataFromBackend;
    } catch (error) {
      console.log(error)
    }

    let dataMap = new Map<string, number>();

    try {
      for (var i = 1; i < dataArr.length; i++) {
        dataMap.set(dataArr[i].name, parseInt(dataArr[i].population));
      }

      dataMap = new Map([...dataMap.entries()].sort((a, b) => a[1] - b[1]));
      var states = Array.from(dataMap.keys());
      return states;
    } catch (error) {
      console.log(error)
    }
  }
  const getPopulation = () => {

    var dataArr: Array<State> = [];
    try {
      dataArr = dataFromBackend;
    } catch (error) {
      console.log(error)
    }

    let dataMap = new Map<string, number>();

    try {
      for (var i = 1; i < dataArr.length; i++) {
        dataMap.set(dataArr[i].name, parseInt(dataArr[i].population));
      }

      dataMap = new Map([...dataMap.entries()].sort((a, b) => a[1] - b[1]));
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
        barThickness: 4,

        label: 'Number of people',
        data: populations,
        borderColor: ['rgb(255, 99, 132)'],
        backgroundColor: ['rgba(255, 99, 132)'],
      }
    ]
  }

  //state population options
  var options = {
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