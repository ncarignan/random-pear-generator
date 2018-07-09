'use strict';

const nameList = localStorage.getItem('nameList') ? JSON.parse(localStorage.getItem('nameList')) : [];
const studentForm = document.getElementById('student-form');
const output = document.getElementById('output');
const generatePears = document.getElementById('generate-pears');
const savePears = document.getElementById('save-pears');

studentForm.addEventListener('submit', handleStudentFormSubmit);
generatePears.addEventListener('click', pairer);
savePears.addEventListener('click', handleSavePears);

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
  let result = [];
  let resultString = '';
  let tempNameList = [...nameList];
  while(tempNameList.length){
    
    let a = tempNameList.splice(Math.floor(Math.random() * tempNameList.length), 1)[0];
    let b = tempNameList.splice(Math.floor(Math.random() * tempNameList.length), 1)[0];
    result.push([a, b]);
  }
  
  let allNewPairs = true;
  result.forEach(pair => {
    if(pair[0].previousPartners.includes(pair[1].name)){
      allNewPairs = false;
    }
    resultString += `${pair[0].name} and ${pair[1].name} <br>`;
  });
  if(!allNewPairs) return pairer(nameList, tries + 1);
  else{
    result.forEach(pair => {
      pair[0].previousPartners.push(pair[1].name);
      pair[1].previousPartners.push(pair[0].name);
    });
    output.innerHTML = resultString;
    console.log(`took ${tries} tries`);
    return;
  }
  
}

function handleSavePears(){
  localStorage.setItem('nameList', JSON.stringify(nameList));
}

// pairer(nameList);

