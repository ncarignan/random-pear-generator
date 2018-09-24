import React from 'react';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      pastPairs:[],
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleAddStudent(this.state);
    this.setState({name : ''});
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    return(
      <form className='student-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type='submit'> Add Student </button>
      </form>
    );
  }
}

export default StudentForm;
