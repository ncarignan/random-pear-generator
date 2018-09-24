import uuid from 'uuid/v4';

export const categoryCreate = student => {
  student._id = uuid();
  student.timestamp = new Date();
  student.pastPearings = [];
  student.currentPartner = null;
  return {
    type: 'STUDENT_CREATE',
    payload: student,
  };
};

export const categoryUpdate = student => ({
  type: 'STUDENT_UPDATE',
  payload: student,
});

export const categoryDelete = student => ({
  type: 'STUDENT_DELETE',
  payload: student,
});

export const categoryReset = () => ({ type: 'STUDENT_RESET' });
