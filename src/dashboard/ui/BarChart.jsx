import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import './BarChart.css';


const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];


const BarChart = () => {
    return (
        <div className="BarChart">
        <h1>Silverthread Sales over Time</h1>
      <VictoryChart
        responsive={false}
        animate={{
          duration: 500,
          onLoad: { duration: 200 }
        }}
        domainPadding={{ x: 0 }}
        theme={VictoryTheme.material}
      >
        <VictoryAxis />
        <VictoryBar
          barRatio={1}
          cornerRadius={0} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
          style={{ data: { fill: "#6DB65B" } }}
          alignment="middle"
          labels={d => d.y}
          data={[
            { x: "Year 1", y: 150000 },
            { x: "Year 2", y: 250000 },
            { x: "Year 3", y: 500020 },
            { x: "Year 4", y: 750000 },
            { x: "Year 5", y: 1000000 }
          ]}
        />
      </VictoryChart>
    </div>
         /* <svg color={"white"} width={500} height={400} style={{ border: "1px solid #ccc", backgroundColor: "white" }}>
         <VictoryChart>
         <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
      </svg> */
    )
}

export default BarChart
