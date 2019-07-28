import React from 'react';
import { ReactComponent as Spinner } from '../styles/icons/spinner-solid.svg';

const Loading = () => {
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
    default:
      break;
  }
  return <div className='alert-text'>{alert}</div>;
};

export default Loading;
