import React from 'react';

//components 
import StudentContainer from '../student-container';
import StudentForm from '../student-form';

class HomeContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      students: localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [],
    };
  }

  handleRemoveStudent = student => {
    let tempStudents = this.state.students;
    let index = tempStudents.indexOf(student);
    tempStudents.splice(index);
    
    this.setState({students:tempStudents});
    localStorage.setItem('students', JSON.stringify(tempStudents));
  }

  handleAddStudent = student => {
    let tempStudents = this.state.students;
    tempStudents.push(student);

    this.setState({ students: tempStudents });
    localStorage.setItem('students', JSON.stringify(tempStudents));
  }

  render() {
    return(
      <section>
        <StudentContainer 
          students={this.state.students} 
          handleRemoveStudent={this.handleRemoveStudent}
          />
        <StudentForm handleAddStudent={this.handleAddStudent}/>
        <RandomPairSection students={this.state.students}/>
      </section>
    );
  }
}

export default HomeContainer;