import React from 'react';

import './pair.scss';

class Pair extends React.Component {
  
  render() {
    return(
      <section className="pair">
        <p>{this.props.pairing[0].name} and {this.props.pairing[1].name} {this.props.pairing[2] ? 'and ' + this.props.pairing[2].name : ''}</p>
      </section>
    );
  }
  
}

export default Pair;