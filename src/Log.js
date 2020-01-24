import React from 'react';
import PropTypes from 'prop-types'

const Log = ({ log }) => {
  return (
    <div className="log">
      {
        log.map(item => {
          const { timestamp, index, timeout } = item;

          return (
            <div>
              {`${timestamp}: Button ${index} was pressed with ${timeout}s timeout`}
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
