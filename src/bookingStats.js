import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function BookingStats(props) {
  return (
    <div className="bookingStatsChart">
      <div className="bookingStatsHeader">Booking Type</div>
      <div className="bookingStatsInn">
        <BarChart
          width={300}
          height={200}
          data={props.bookingStats}
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
        <p className="label">{`${label} Booking`}</p>
        <p className="label">{`Rides : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default BookingStats;
