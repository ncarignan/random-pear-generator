let initialState = [];

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case 'Student_CREATE': return [...state, payload];
    case 'Student_UPDATE': return state.map(student => student._id === payload._id ? payload : student);
    case 'Student_DELETE': return state.filter(student => student._id !== payload._id);
    case 'Student_RESET': return initialState;
    default: return state;
  }
};
