import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import Loading from './loading';
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
          <div>
            <form onSubmit={e => handleEdit(e)}>
              <small>Blank with * is reuiqred</small>
              <div>
                * First Name:{' '}
                <input
                  name='firstname'
                  value={firstname}
                  onChange={e => handleChange(e)}
                  placeholder='firstname'
                />
              </div>
              <div>
                * Last Name:{' '}
                <input
                  name='lastname'
                  value={lastname}
                  onChange={e => handleChange(e)}
                  placeholder='lastname'
                />
              </div>
              <div>
                * Sex:{' '}
                <input
                  name='sex'
                  value={sex}
                  onChange={e => handleChange(e)}
                  placeholder='sex'
                />
              </div>
              <div>
                * Age:{' '}
                <input
                  name='age'
                  value={age}
                  onChange={e => handleChange(e)}
                  placeholder='age'
                />
              </div>
              <div>
                * Password:{' '}
                <input
                  name='password'
                  value={password}
                  onChange={e => handleChange(e)}
                  placeholder='password'
                />
              </div>
              <div>
                * Repet:{' '}
                <input
                  name='repeat'
                  value={repeat}
                  onChange={e => handleChange(e)}
                  placeholder='repeat'
                />
              </div>
              <div>
                <input
                  value='Submit'
                  type='submit'
                  disabled={
                    !(firstname && lastname && sex && age && password && repeat)
                  }
                />
              </div>
            </form>
            <div>{alertContent}</div>
          </div>
          <div>
            <button onClick={handleBack}>Back</button>
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
