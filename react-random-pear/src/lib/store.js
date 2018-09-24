import { createStore } from 'redux';
import reducer from '../reducer/student.js';

export default () => createStore(reducer);
