'use strict';

const nameList = localStorage.getItem('nameList') ? JSON.parse(localStorage.getItem('nameList')) : [];
const studentForm = document.getElementById('student-form');
const output = document.getElementById('output');
const generatePears = document.getElementById('generate-pears');
const savePears = document.getElementById('save-pears');
const resetPears = document.getElementById('reset-pears');
let resultPears = [];


studentForm.addEventListener('submit', handleStudentFormSubmit);
generatePears.addEventListener('click', pairer);
savePears.addEventListener('click', handleSavePears);
resetPears.addEventListener('click', handleResetPears);

function Student(name) {
  this.name = name;
  this.previousPartners = [];
  nameList.push(this);
}

function handleStudentFormSubmit(event) {
  event.preventDefault();
  
  let students = event.target.students.value.split(',').map(student => student.trim());
  students.forEach(student => new Student(student));
  
  event.target.students.value = '';
  
  localStorage.setItem('nameList', JSON.stringify(nameList));
}

function pairer(event, tries = 0) {
  resultPears = [];
  let resultString = '';
  let tempNameList = [...nameList];
  while(tempNameList.length){
    if(!(tempNameList.length - 1)){
      let a = tempNameList.splice(Math.floor(Math.random() * tempNameList.length), 1)[0];
      resultPears[resultPears.length - 1].push(a);
      console.log(resultPears);
    }else {
      let a = tempNameList.splice(Math.floor(Math.random() * tempNameList.length), 1)[0];
      let b = tempNameList.splice(Math.floor(Math.random() * tempNameList.length), 1)[0];
      resultPears.push([a, b]);
    }

  }
  
  let allNewPairs = true;
  resultPears.forEach(pair => {
    if(pair[0].previousPartners.includes(pair[1].name)){
      allNewPairs = false;
    }
    resultString += `${pair[0].name} and ${pair[1].name} ${pair[2] ? ' and ' + pair[2].name : ''}<br>`;
  });
  if(!allNewPairs) return pairer(nameList, tries + 1);
  else{
    
    output.innerHTML = resultString;
    console.log(`took ${tries} tries`);
    return;
  }
  
}

function handleSavePears(){
  localStorage.setItem('nameList', JSON.stringify(nameList));
  resultPears.forEach(pair => {
    pair[0].previousPartners.push(pair[1].name);
    pair[1].previousPartners.push(pair[0].name);
  });
}

function handleResetPears() {
  nameList.map(student => student.previousPartners = []);
  localStorage.setItem('nameList', JSON.stringify(nameList));
}



