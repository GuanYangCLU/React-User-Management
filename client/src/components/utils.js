import React from 'react';
import { ReactComponent as Spinner } from '../styles/icons/spinner-solid.svg';

export const Loading = () => {
  return (
    <div className='loading'>
      {/* <i className='fas fa-spinner' /> */}
      <Spinner />
      <h1>Loading...</h1>
    </div>
  );
};

export const Alert = ({ warning, item }) => {
  let alert = '';
  switch (warning) {
    case 'empty':
      alert = item + ' cannot be empty!';
      break;
    case 'match':
      alert = item + ' does not match!';
      break;
    case 'invalid':
      alert = item + ' you type is invalid!';
      break;
    case 'server':
      alert = 'server failed to ' + item;
      break;
    default:
      break;
  }
  return <small className='alert-text'>{alert}</small>;
};

// export default Loading;
