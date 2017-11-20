import React from 'react';
import PropTypes from 'prop-types';

import './InputHint.scss';

const InputHint = ({ children }) => <div className="input-hint">{children}</div>;

InputHint.propTypes = {
  children: PropTypes.node.isRequired
};

export default InputHint;
