import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, initUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';

const CreateUser = ({
  setAlert,
  createUser,
  alertContent,
  history,
  createSuccess,
  initUser
}) => {
  useEffect(() => initUser());

  const [userData, setUserData] = useState({
    firstname: null,
    lastname: null,
    sex: null,
    age: null,
    password: null,
    repeat: null
  });

  const { firstname, lastname, sex, age, password, repeat } = userData;

  // const submitUser = async () => {
  //   let rs = await createUser({ firstname, lastname, sex, age, password });
  //   console.log(rs);
  //   if (rs === 'success') {
  //     initUser();
  //     history.push('/');
  //   } else {
  //     setAlert('Failed to create!');
  //   }
  // };

  const handleCreate = e => {
    e.preventDefault();
    if (password !== repeat) {
      setAlert('Password does not match!');
    } else {
      createUser({ firstname, lastname, sex, age, password });
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
      {createSuccess ? (
        <Redirect to='/' />
      ) : (
        <div>
          <div>
            <form onSubmit={e => handleCreate(e)}>
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
    createSuccess: state.createUser.createSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    createUser: data => dispatch(createUser(data)),
    initUser: () => dispatch(initUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
