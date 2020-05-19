import React from 'react'
import PropTypes from 'prop-types'

const FromMessage =({children, type}) => {
    const color = type === "error" ? "#9a3f38" : "#6597a7";
    return <div style={{color}}>{children}</div>
}

FromMessage.propTypes = {
    type: PropTypes.oneOf(["error", "info"]).isRequired,
    children: PropTypes.string
}
FromMessage.defaultProps  = { 
    type: 'error'
}

export default FromMessage
