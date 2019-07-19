const popAlert = alert => {
  return {
    type: 'POP_ALERT',
    payload: { alertContent: alert }
  };
};

const clearAlert = () => {
  return {
    type: 'CLEAR_ALERT',
    payload: { alertContent: null }
  };
};

export const setAlert = alert => dispatch => {
  dispatch(popAlert(alert));
  setTimeout(() => dispatch(clearAlert()), 2000);
};
