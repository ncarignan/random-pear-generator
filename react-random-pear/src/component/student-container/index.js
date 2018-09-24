import React from 'react';

//components 
import Student from '../student';

class StudentContainer extends React.Component {
  
  render() {
    return(
      <section>
        
        {this.props.students.map((student, index) => 
          <Student 
            name={student.name} 
            key={index} 
            index={index}
            handleRemoveStudent={this.props.handleRemoveStudent}
            handleChangeStudentFocus={this.props.handleChangeStudentFocus}
          />
        )}
        
      </section>
    );
  }
  
}

export default StudentContainer;