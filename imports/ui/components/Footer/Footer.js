import React from 'react';
import { Grid } from 'react-bootstrap';

import './Footer.scss';

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">Reddit Reader</p>
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
