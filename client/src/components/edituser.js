import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import Loading, { BackIcon, DoneIcon } from './loading';
import axios from 'axios';

// const getUserById = id => dispatch => dispatch(getUser(id));

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  editSuccess,
  match,
  isLoading
}) => {
  const id = match.params.userId;

  const [userData, setUserData] = useState({
    firstname: null,
    lastname: null,
    sex: null,
    age: null,
    password: null,
    repeat: null
  });

  useEffect(() => {
    // initEdit(); // may not need any more
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUserData({
          ...userData,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          sex: res.data.sex,
          age: res.data.age
        });
      })
      .catch(err => setAlert(err));
    // we cannot use loacl state to redux as a prop here
  }, []);

  const { firstname, lastname, sex, age, password, repeat } = userData;

  const handleEdit = e => {
    e.preventDefault();
    if (password !== repeat) {
      setAlert('Password does not match!');
    } else {
      editUser({ id, firstname, lastname, sex, age, password });
    }
  };

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    history.push('/');
  };

  return (
    <div>
      {editSuccess ? (
        <Redirect to='/' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Edit User</div>
          <div className='container'>
            <form onSubmit={e => handleEdit(e)}>
              <small className='form-text text-muted'>
                Blank with * is reuiqred
              </small>
              <div className='form-group'>
                * First Name:{' '}
                <input
                  className='form-control'
                  name='firstname'
                  value={firstname}
                  onChange={e => handleChange(e)}
                  placeholder='firstname'
                />
              </div>
              <div className='form-group'>
                * Last Name:{' '}
                <input
                  className='form-control'
                  name='lastname'
                  value={lastname}
                  onChange={e => handleChange(e)}
                  placeholder='lastname'
                />
              </div>
              <div className='form-group'>
                * Sex:{' '}
                <input
                  className='form-control'
                  name='sex'
                  value={sex}
                  onChange={e => handleChange(e)}
                  placeholder='sex'
                />
              </div>
              <div className='form-group'>
                * Age:{' '}
                <input
                  className='form-control'
                  name='age'
                  value={age}
                  onChange={e => handleChange(e)}
                  placeholder='age'
                />
              </div>
              <div className='form-group'>
                * Password:{' '}
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={password}
                  onChange={e => handleChange(e)}
                  placeholder='password'
                />
              </div>
              <div className='form-group'>
                * Repet:{' '}
                <input
                  className='form-control'
                  type='password'
                  name='repeat'
                  value={repeat}
                  onChange={e => handleChange(e)}
                  placeholder='repeat'
                />
              </div>
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      !(
                        firstname &&
                        lastname &&
                        sex &&
                        age &&
                        password &&
                        repeat
                      )
                    }
                  >
                    <DoneIcon />
                    <div className='btn-text'>Save Changes</div>
                  </button>
                </div>
                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <BackIcon />
                    <div className='btn-text'>Back</div>
                  </button>
                </div>
              </div>
            </form>
            <div>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    editSuccess: state.editUser.editSuccess,
    isLoading: state.editUser.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: data => dispatch(editUser(data)),
    initEdit: () => dispatch(initEdit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
