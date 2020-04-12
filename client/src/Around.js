/**
 * around the city your search
 */ 
import React, { Component } from 'react';

class Around extends Component {
  render() {
    return (
      <div className="display-content">
        {
          this.props.around.map((v, i) => {
            return (
              <div key={i} className="around-item">
                <p>{v}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Around;
