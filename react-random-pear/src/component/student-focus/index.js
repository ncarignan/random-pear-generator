import React from 'react';

import './student-focus.scss';

import Pair from '../pair';

class StudentFocus extends React.Component {
  
  render() {
    return(
      <section  className="student">
        <h1>{this.props.student.name}</h1>
        <ul>
          {this.props.student.pastPairs.map((pair, index) => <Pair key={index} pair={pair} />)
          }
        </ul>
      </section>
    );
  }
  
}

export default StudentFocus;