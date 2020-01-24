import React from 'react';
import PropTypes from 'prop-types'
import df from 'date-fns/format';

const Log = ({ log }) => {
  return (
    <div className="log">
      {
        log.map((item, index) => {
          const { timestamp, index: btnIndex, timeout } = item;
          const formattedDate = df(timestamp, 'HH:mm:ss dd.MM.yyyy');

          return (
            <div key={index}>
              {`${formattedDate}: Button ${btnIndex + 1} was pressed with ${timeout}s timeout`}
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
