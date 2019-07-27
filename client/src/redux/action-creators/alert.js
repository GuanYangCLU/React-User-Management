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

export const setAlertByWarning = (warning, item) => dispatch => {
  const alert = '';
  switch (warning) {
    case 'empty':
      alert = item + ' cannot be empty!';
      dispatch(popAlert(alert));
    case 'match':
      alert = item + ' does not match!';
      dispatch(popAlert(alert));

    default:
      break;
  }
};
