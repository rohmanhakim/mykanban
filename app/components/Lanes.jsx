import React, { PropTypes } from 'react'
import Lane from './Lane'

const Lanes = ({lanes}) => {
  return(
    <div className="lanes">{lanes.map(lane =>
      <Lane className="lane" key={lane.id} lane={lane} />
    )}
    </div>
  )
}
Lanes.propTypes = {
  lanes: PropTypes.array
};
Lanes.defaultProps = {
  lanes: []
};

export default Lanes;
