import React from 'react';
// import PropTypes from 'prop-types';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday'
];

function getTick(index) {
  return index === 6
    ? { stroke: 'black', fontSize: 15, strokeWidth: 1 }
    : { fontSize: 0 };
}

function renderTooltip(props) {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #999',
          margin: 0,
          padding: 10
        }}
      >
        <p>
          <span>Time: </span>
          {`${data.hour} : 00`}
        </p>
        <p>
          <span>Rides: </span>
          {data.rides}
        </p>
      </div>
    );
  }

  return null;
}

function TimelyRides(props) {
  return (
    <div className="timelyRidesChart">
      <div className="timelyRidesChartHeader">Day and Time Based Rides</div>
      <div className="timelyRidesChartInn">
        {days.map((day, index) => {
          return (
            <ScatterChart
              width={800}
              height={60}
              margin={{
                top: 10,
                right: 0,
                bottom: 0,
                left: 0
              }}
              key={index}
            >
              <XAxis
                type="category"
                dataKey="hour"
                name="hour"
                unit=" Hrs"
                interval={1}
                tick={getTick(index)}
                tickLine={{ transform: 'translate(0, -6)' }}
              />
              <YAxis
                type="number"
                dataKey="rides"
                height={10}
                width={100}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={{ value: day, position: 'insideRight' }}
              />
              <ZAxis
                type="category"
                dataKey="hour"
                name="hour"
                range={[0, 2000]}
                domain={[0, 5000]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                wrapperStyle={{ zIndex: 100 }}
                content={renderTooltip}
              />
              <Scatter data={props.weeklyTimeRides[index]} fill="#8884d8" />
            </ScatterChart>
          );
        })}
      </div>
    </div>
  );
}

// TimelyRides.propTypes = {};

export default TimelyRides;
