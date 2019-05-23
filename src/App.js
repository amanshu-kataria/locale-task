import React, { PureComponent } from 'react';
import CsvUploader from './csvUploader';
import ReactMapGL from 'react-map-gl';
import GeoLib from 'geolib';
import MapLayers from './mapLayers.json';
import TimelyRides from './timelyRides';
import TravelTypeChart from './travelTypeChart';
import PackageType from './packageType';
import BookingStats from './bookingStats';

class App extends PureComponent {
  state = {
    showMap: false,
    data: [],
    coordinates: [],
    viewport: {
      width: (80 / 100) * window.screen.width,
      height: 600,
      latitude: 12.92415,
      longitude: 77.67229,
      zoom: 8
    }
  };

  componentDidMount() {
    this.data = [];
    this.coordinates = [];
    this.totalDistance = 0;
    this.totalOnlineBooking = 0;
    this.totalMobileBooking = 0;
    this.totalCarCancellation = 0;
    this.totalLongDistanceRides = 0;
    this.totalP2PRides = 0;
    this.totalHourlyRentalRides = 0;
    this.packageType = [
      { type: '4 hrs & 40 kms', rides: 0 },
      { type: '8 hrs & 80 kms', rides: 0 },
      { type: '6 hrs & 60 kms', rides: 0 },
      { type: '10 hrs & 100 kms', rides: 0 },
      { type: '5 hrs & 50 kms', rides: 0 },
      { type: '3 hrs & 30 kms', rides: 0 },
      { type: '12 hrs & 120 kms', rides: 0 }
    ];
    this.dayRides = [0, 0, 0, 0, 0, 0, 0]; //Sunday at 0

    this.weeklyTimeRides = this.dayRides.map(() => {
      let time = [];
      for (let i = 0; i < 24; i++) {
        time.push({ hour: i, rides: 0 });
      }
      return time;
    });
    // this.setState({ showMap: true });
  }

  setData = () => {
    this.setState({
      showMap: true,
      data: this.data,
      coordinates: this.coordinates
    });
  };

  onEachStep = data => {
    this.data.push(data);
    this.coordinates.push([data.from_long, data.from_lat]);

    let { from_lat, from_long, to_lat, to_long } = data;

    from_lat = parseFloat(from_lat);
    from_long = parseFloat(from_long);
    to_lat = parseFloat(to_lat);
    to_long = parseFloat(to_long);

    if (
      !(
        Number.isNaN(from_lat) ||
        Number.isNaN(from_long) ||
        Number.isNaN(to_lat) ||
        Number.isNaN(to_long)
      )
    ) {
      this.totalDistance += GeoLib.getDistance(
        { latitude: from_lat, longitude: from_long },
        { latitude: to_lat, longitude: to_long }
      );
    }

    if (data.online_booking === '1') {
      this.totalOnlineBooking++;
    }

    if (data.mobile_site_booking === '1') {
      this.totalMobileBooking++;
    }

    if (data.Car_Cancellation === '1') {
      this.totalCarCancellation++;
    }

    const travelType = data.travel_type_id;

    if (travelType === '1') {
      this.totalLongDistanceRides++;
    } else if (travelType === '2') {
      this.totalP2PRides++;
    } else if (travelType === '3') {
      this.totalHourlyRentalRides++;

      const packageType = parseInt(data.package_id);

      if (!Number.isNaN(packageType) && packageType <= 7) {
        this.packageType[packageType - 1].rides++;
      }
    }

    let date = new Date(data.from_date);
    const day = date.getDay();
    if (!Number.isNaN(day)) {
      const hour = date.getHours();
      this.dayRides[day - 1]++;

      this.weeklyTimeRides[day][hour].rides++;
    }
  };

  getMapStyle = () => {
    return {
      version: 8,
      name: 'Basic',
      metadata: {
        'mapbox:autocomposite': true
      },
      sources: {
        mapbox: {
          url: 'mapbox://mapbox.mapbox-streets-v7',
          type: 'vector'
        },
        points: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'MultiPoint',
                  coordinates: this.state.coordinates
                }
              }
            ]
          }
        }
      },
      sprite: 'mapbox://sprites/mapbox/basic-v8',
      glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      layers: MapLayers
    };
  };

  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <div className="appHeaderName">Locale Visualisations</div>
        </div>
        {this.state.showMap ? (
          <div className="mainPanel">
            <div className="mapView">
              <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={
                  'pk.eyJ1IjoiYW1hbnNodS1rYXRhcmlhIiwiYSI6ImNqdndvbTUzMzAyYWY0NnBuZmNybjY2NGMifQ.8zi4nrE_fLjKiGK0XYsW3Q'
                }
                onViewportChange={viewport => this.setState({ viewport })}
                mapStyle={this.getMapStyle()}
              />
            </div>
            <div className="factsRow">
              <p>Number of rides booked: {this.data.length} </p>
              <p>
                Total distance covered: {(this.totalDistance / 1000).toFixed(2)}{' '}
                KMs
              </p>
              <p>Total Rides cancelled: {this.totalCarCancellation}</p>
            </div>
            <div className="chartRow">
              {TimelyRides({ weeklyTimeRides: this.weeklyTimeRides })}
            </div>

            <div className="chartRow">
              {TravelTypeChart({
                typeRides: [
                  { type: 'Long Distance', rides: this.totalLongDistanceRides },
                  { type: 'Point to Point', rides: this.totalP2PRides },
                  { type: 'Hourly', rides: this.totalHourlyRentalRides }
                ]
              })}
              {PackageType({ packageType: this.packageType })}
            </div>
            <div className="chartRow">
              {BookingStats({
                bookingStats: [
                  { type: 'Mobile', rides: this.totalMobileBooking },
                  { type: 'Online', rides: this.totalOnlineBooking }
                ]
              })}
            </div>
          </div>
        ) : (
          <CsvUploader onComplete={this.setData} onEachStep={this.onEachStep} />
        )}
      </div>
    );
  }
}

export default App;
