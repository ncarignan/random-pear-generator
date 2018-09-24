import React from 'react';

//components 
import Pair from '../pair';

class RandomPairingsContainer extends React.Component {
  
  render() {
    return(
      <section>
        {this.props.pairings.map((pairing, index) => 
          <Pair 
            pairing={pairing} 
            key={index} 
            index={index}
          />
        )}
        
      </section>
    );
  }
  
}

export default RandomPairingsContainer;