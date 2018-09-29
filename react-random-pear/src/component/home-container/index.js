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
    let result = this._handleCreatePairs(); // returns an array of [pairs, students]
    console.log(this.state.students);
    if(result) {
      this.setState({pairings:result[0], students: result[1]});
      localStorage.setItem('students', JSON.stringify(result[1]));
      console.log(result[2]);
    } else {
      console.log('there are no more unique combinations') //TODO: Alert the user
    }
  }

  _handleCreatePairs = (tries=0, projectName) => {
    let resultPairs = [];
    let resultStudents = [];
    let tempStudents = JSON.parse(JSON.stringify(this.state.students));;
    projectName = projectName ? projectName : new Date().getUTCMonth() + ' ' + new Date().getDay();

    while (tempStudents.length) {
      if (!(tempStudents.length - 1)) {
        let a = tempStudents.splice(0, 1)[0];
        let b = resultPairs[resultPairs.length - 1][0];
        let c = resultPairs[resultPairs.length - 1][1];
        resultPairs[resultPairs.length - 1].push(a);
        
        a.pastPairs.push({ projectName: projectName, partners: [b.name, c.name] })
        b.pastPairs[b.pastPairs.length -1] = { projectName: projectName, partners: [a.name, c.name] };
        c.pastPairs.push({ projectName: projectName, partners: [a.name, c.name]})
        resultStudents.push(a);
      } else {
        let aToSplice = Math.floor(Math.random() * tempStudents.length);
        let a = tempStudents.splice(aToSplice, 1)[0];
        let b = tempStudents.splice(Math.floor(Math.random() * tempStudents.length), 1)[0];
        resultPairs.push([a, b]);
        a.pastPairs.push({ projectName: projectName, partners: [b.name] })
        b.pastPairs.push({projectName: projectName, partners: [a.name]})
        resultStudents.push(a, b);
      }
    }

    let allNewPairs = true;
    resultPairs.forEach(pair => {
      for(let i = 0; i < pair.length; i++){ // check all pair members
        for(let j = 0; j < pair[i].pastPairs.length - 1; j++){ // check all past pairs for each member
          for(let k = i; k < pair.length; k++){// check against the name of the other partners
            if(pair[i].pastPairs[j].partners[0] === pair[k].name){
              // debugger;
              allNewPairs = false
            }
          }
        } 
      }
    });
    if(tries > 3000){
      return null;
    } else if (!allNewPairs){
      return this._handleCreatePairs(tries + 1, projectName);
    } 
    else {
      return [resultPairs, this._sortStudents(resultStudents), tries];
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