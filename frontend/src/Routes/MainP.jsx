import React from "react";
import { Link } from "react-router-dom";

export default function MainP() {
  return (
    <div className="entry-page">
      <div className="header">
        <h1>Welcome to Haulerway</h1>
      </div>
      <div className="purpose">
        <h2>Our Purpose</h2>
        <p>
          Haulerway is here to make transportation easier and more efficient for
          everyone. Whether you need to move goods, equipment, or anything else,
          we've got you covered.
        </p>
      </div>
      <div className="button-container">
        <button className="start-button">
          <Link to="/Map">Map</Link>
        </button>
      </div>
    </div>
  );
}
