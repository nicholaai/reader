import React from 'react';
import PropTypes from 'prop-types';

import './AccountPageFooter.scss';

const AccountPageFooter = ({ children }) => <div className="account-page-footer">{children}</div>;

AccountPageFooter.propTypes = {
  children: PropTypes.node.isRequired
};

export default AccountPageFooter;
