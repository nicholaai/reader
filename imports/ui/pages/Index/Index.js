import React from 'react';
import { Link } from 'react-router-dom';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <img src="/icon.png" alt="Reddit Icon" />
    <h1>Reader</h1>
    <p>A reddit app that is definitely not enabling your procratination.</p>
    <div>
      <Link to="/signup">
        <button className="btn start-btn">Get Started</button>
      </Link>
    </div>
  </div>
);

export default Index;
