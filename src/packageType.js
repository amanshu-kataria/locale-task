import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function PackageType(props) {
  return (
    <div className="packageTypeChart">
      <div className="packageTypeHeader">Package Type</div>
      <div className="packageTypeInn">
        <BarChart
          width={500}
          height={200}
          data={props.packageType}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 50
          }}
        >
          <XAxis
            dataKey="type"
            tick={{
              fontSize: 10,
              width: 30
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
        <p className="label">{`${label}`}</p>
        <p className="label">{`Rides : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default PackageType;
