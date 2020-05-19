import React from "react"
import PropTypes from "prop-types"

const FormMessage = ({type, children}) => {
  return (
    <div style={{color: type === "error" ? "#9a3f38" : "#6597a7"}}>
      {children}
    </div>
  )
}

FormMessage.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
}

FormMessage.defaultProps = {
  type: "error",
}

export default FormMessage
