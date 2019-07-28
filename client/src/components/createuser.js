import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, initUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import Loading, { Alert } from './loading';

const CreateUser = ({
  setAlert,
  createUser,
  alertContent,
  history,
  createSuccess,
  isLoading
}) => {
  // useEffect(() => initUser(), []); // may not need anymore

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    password: '',
    repeat: ''
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
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Create User</div>
          <div className='container'>
            <form onSubmit={e => handleCreate(e)}>
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
                {!firstname && <Alert warning='empty' item='firstname' />}
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
                {!lastname && <Alert warning='empty' item='lastname' />}
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
                {!sex && <Alert warning='empty' item='sex' />}
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
                {!age && <Alert warning='empty' item='age' />}
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
                {!password && <Alert warning='empty' item='password' />}
              </div>
              <div className='form-group'>
                * Repeat:{' '}
                <input
                  className='form-control'
                  type='password'
                  name='repeat'
                  value={repeat}
                  onChange={e => handleChange(e)}
                  placeholder='repeat'
                />
                {!repeat && <Alert warning='empty' item='confirmed password' />}
                {repeat && password !== repeat && (
                  <Alert warning='match' item='password' />
                )}
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
                        repeat &&
                        password === repeat
                      )
                    }
                  >
                    <i className='fas fa-arrow-down' /> Add User
                  </button>
                </div>

                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    createSuccess: state.createUser.createSuccess,
    isLoading: state.createUser.isLoading
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
