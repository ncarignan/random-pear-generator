import React from 'react';
import renderIf from 'render-if';

//components 
import StudentContainer from '../student-container';
import StudentForm from '../student-form';
import StudentFocus from '../student-focus';
import RandomPairingContainer from '../random-pairing-container';

class HomeContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      students: localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [],
      studentFocus: false,
      pairings: false      
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
    tempStudents = this._sortStudents(tempStudents);

    this.setState({ students: tempStudents });
    localStorage.setItem('students', JSON.stringify(tempStudents));
  }

  handleChangeStudentFocus = event => {
    if(event.target.className !== "remove-student"){
      this.setState({studentFocus: this.state.students[event.target.dataset.key]})
    }
  }
    
  handleCreatePairs = () => {
    console.log(this.state.students);
    let result = this._handleCreatePairs(this.state.students); // returns an array of [pairs, students]
    if(result) {
      this.setState({pairings:result[0], students: result[1]});
      localStorage.setItem('students', JSON.stringify(result[1]));
    } else {
      alert('there are no more unique combinations')
    }
  }

  _handleCreatePairs = (students, tries=0, projectName) => {
    let resultPairs = [];
    let resultStudents = [];
    let tempStudents = [...students];
    projectName = projectName ? projectName : new Date().getUTCMonth() + ' ' + new Date().getDay();

    while (tempStudents.length) {
      if (!(tempStudents.length - 1)) {
        let a = tempStudents.splice(Math.floor(Math.random() * tempStudents.length), 1)[0];
        resultPairs[resultPairs.length - 1].push(a.name);
        // resultStudents
        resultStudents.push(a);
      } else {
        let aToSplice = Math.floor(Math.random() * tempStudents.length);
        // debugger;
        // console.log(tempStudents.splice(aToSplice, 1)[0])
        let a = tempStudents.splice(aToSplice, 1)[0];
        debugger;
        let b = tempStudents.splice(Math.floor(Math.random() * tempStudents.length), 1)[0];
        resultPairs.push([a, b]);
        debugger;
        a.pastPairs.push({ projectName: projectName, partner: b.name })
        debugger;
        b.pastPairs.push({projectName: projectName, partner: a.name})
        resultStudents.push(a, b);
      }
    }

    let allNewPairs = true;
    resultPairs.forEach(pair => {
      for(let i = 0; i < pair[0].pastPairs.length - 1; i++){
        debugger;
        if(pair[0].pastPairs[i].partner === pair[1].name){
          allNewPairs = false
        }
      }
    });
    if (!allNewPairs){
      debugger;
      students.forEach(student => {
        student.pastPairs.pop();
      })
      return this._handleCreatePairs(students, tries + 1, projectName);
    } 
    else if(tries === 100){
      console.log('infinite loop reached');
      return null;
    }
    else {
      return [resultPairs, this._sortStudents(resultStudents)];
    }
  }

  handleSavePairs = () => {
    this.setState({ students: this.state.tempPairedStudents });
    localStorage.setItem('students', JSON.stringify(this.state.students));
  }

  _sortStudents = students => {
    return students.sort(function (a, b) {
      a = a.name.toUpperCase();
      b = b.name.toUpperCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
  }
    render() {
    return(
      <section>
        <StudentContainer 
          students={this.state.students} 
          handleRemoveStudent={this.handleRemoveStudent}
          handleChangeStudentFocus={this.handleChangeStudentFocus}
          />
        <StudentForm handleAddStudent={this.handleAddStudent}/>

        <button onClick={this.handleCreatePairs}>Generate Pairs</button>

        {renderIf(this.state.studentFocus)(
          <StudentFocus student={this.state.studentFocus} />
        )}

        {renderIf(this.state.pairings)(
          <RandomPairingContainer pairings={this.state.pairings}/>
        )}
      </section>

    );
  }
}

export default HomeContainer;