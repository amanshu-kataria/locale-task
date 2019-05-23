import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function TravelTypeChart(props) {
  return (
    <div className="travelTypeChart">
      <div className="travelTypeChartHeader">Travel Type Chart</div>
      <div className="travelTypeChartInn">
        <BarChart
          width={300}
          height={200}
          data={props.typeRides}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis
            dataKey="type"
            tick={{
              fontSize: 10,
              width: 40
            }}
            interval={0}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rides" barSize={15} fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Rides : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default TravelTypeChart;
