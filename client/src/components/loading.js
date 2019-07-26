import React from 'react';
import { ReactComponent as Pen } from '../styles/icons/pen-solid.svg';
import { ReactComponent as Trash } from '../styles/icons/trash-alt-solid.svg';
import { ReactComponent as Man } from '../styles/icons/user-solid.svg';
import { ReactComponent as DownArrow } from '../styles/icons/arrow-alt-circle-down-regular.svg';
import { ReactComponent as LeftArrow } from '../styles/icons/arrow-alt-circle-left-regular.svg';
import { ReactComponent as Spinner } from '../styles/icons/spinner-solid.svg';

export const EditIcon = () => {
  return (
    <div className='with-icon'>
      <Pen />
      <div className='icon-text'>{'ed'}</div>
    </div>
  );
};

export const DeleteIcon = () => {
  return (
    <div className='with-icon'>
      <Trash />
      <div className='icon-text'>{'dl'}</div>
    </div>
  );
};

export const UserIcon = () => {
  return (
    <div className='with-icon'>
      <Man />
      <div className='icon-text'>{'us'}</div>
    </div>
  );
};

export const DoneIcon = () => {
  return (
    <div className='with-icon'>
      <DownArrow />
      <div className='icon-text'>{'dn'}</div>
    </div>
  );
};

export const BackIcon = () => {
  return (
    <div className='with-icon'>
      <LeftArrow />
      <div className='icon-text'>{'bk'}</div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className='loading'>
      <Spinner />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
