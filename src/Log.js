import React from 'react';
import PropTypes from 'prop-types'

const Log = ({ log }) => {
  return (
    <div className="log">
      {
        log.map((item, index) => {
          const { timestamp, index: btnIndex, timeout } = item;

          return (
            <div key={index}>
              {`${timestamp.toLocaleString()}: Button ${btnIndex + 1} was pressed with ${timeout}s timeout`}
            </div>
          );
        })
      }
    </div>
  );
};

Log.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.object.isRequired,
      index: PropTypes.number.isRequired,
      timeout: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Log;
