import React from 'react';

import './student.scss';

class StudentContainer extends React.Component {
  
  render() {
    return(
      <section  className="student">
        <p
          data-key={this.props.index}
          onClick={this.props.handleChangeStudentFocus}
        >
          {this.props.name}
        </p>
        <button className="remove-student" onClick={this.props.handleRemoveStudent}>x</button>
      </section>
    );
  }
  
}

export default StudentContainer;