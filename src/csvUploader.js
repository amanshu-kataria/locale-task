import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import PapaParse from 'papaparse';

class CsvUploader extends PureComponent {
  state = {
    loading: false
  };

  onFileUpload = e => {
    const file = e.target.files[0];
    this.setState({ loading: true });
    PapaParse.parse(file, {
      step: result => {
        if (result.data[0][0] !== 'id') {
          const data = {
            id: result.data[0][0],
            user_id: result.data[0][1],
            vehicle_model_id: result.data[0][2],
            package_id: result.data[0][3],
            travel_type_id: result.data[0][4],
            from_area_id: result.data[0][5],
            to_area_id: result.data[0][6],
            from_city_id: result.data[0][7],
            to_city_id: result.data[0][8],
            from_date: result.data[0][9],
            to_date: result.data[0][10],
            online_booking: result.data[0][11],
            mobile_site_booking: result.data[0][12],
            booking_created: result.data[0][13],
            from_lat: result.data[0][14],
            from_long: result.data[0][15],
            to_lat: result.data[0][16],
            to_long: result.data[0][17],
            Car_Cancellation: result.data[0][18]
          };
          this.props.onEachStep(data);
        }
      },
      complete: results => {
        console.log(`Parsed :)`);
        this.props.onComplete();
      }
    });
  };

  render() {
    return (
      <div className="csvUploaderModal">
        {this.state.loading ? (
          <div className="loaderText">
            File is being parsed. This could take some time.
          </div>
        ) : (
          <div className="modalContent">
            <div className="modalUploadContent">
              <span className="modalUploadContentText">
                Please Upload a CSV file:
              </span>
              <span
                className="csvUploadButton"
                onClick={() => this.fileUpload.click()}
              >
                Upload file
              </span>
              <input
                type="file"
                ref={input => (this.fileUpload = input)}
                onChange={this.onFileUpload}
                style={{ display: 'none' }}
                accept=".csv"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

// CsvUploader.propTypes = {};

export default CsvUploader;
