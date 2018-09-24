import React from 'react';

//components 
import Student from '../student';

class StudentContainer extends React.Component {
  
  render() {
    return(
      <section>
        <ul>
          {this.props.students.map((student, index) => 
            <Student 
              name={student.name} 
              key={index} 
              handleRemoveStudent={this.props.handleRemoveStudent}
            />
          )}
        </ul>
      </section>
    );
  }
  
}

export default StudentContainer;