import React, { PureComponent } from 'react';
import CsvUploader from './csvUploader';
import ReactMapGL from 'react-map-gl';

class App extends PureComponent {
  componentDidMount() {
    this.data = [];
    this.coordinates = [];
  }

  state = {
    showMap: false,
    data: [],
    coordinates: [],
    viewport: {
      width: 600,
      height: 600,
      latitude: 12.92415,
      longitude: 77.67229,
      zoom: 8
    }
  };

  setData = () => {
    this.setState({
      showMap: true,
      data: this.data,
      coordinates: this.coordinates
    });
  };

  getMapStyle = () => {
    return {
      version: 8,
      sources: {
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
      layers: [
        {
          id: 'my-layer',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-color': '#fbb03b',
            'circle-radius': 4
          }
        }
      ]
    };
  };

  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <div className="appHeaderName">Locale Visualisations</div>
        </div>
        {this.state.showMap ? (
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={
              'pk.eyJ1IjoiYW1hbnNodS1rYXRhcmlhIiwiYSI6ImNqdndvbTUzMzAyYWY0NnBuZmNybjY2NGMifQ.8zi4nrE_fLjKiGK0XYsW3Q'
            }
            onViewportChange={viewport => this.setState({ viewport })}
            mapStyle={this.getMapStyle()}
          />
        ) : (
          <CsvUploader
            onComplete={this.setData}
            onEachStep={data => {
              this.data.push(data);
              this.coordinates.push([data.from_long, data.from_lat]);
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
