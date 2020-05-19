import React from "react";
import PropTypes from "prop-types";

const Message = ({color, type, children}) => {
  return (
    <div className={`ui icon message ${color}`}>
      <i className={`icon ${type}`} />
      <div className="content">
        <div className="header">{children}</div>
      </div>
    </div>
  );
};

Message.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Message.defaultProps = {
  color: "orange",
  type: "bell",
};

export default Message;
