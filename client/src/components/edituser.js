import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import Loading, { Alert } from './loading';
// import axios from 'axios';

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  editSuccess,
  match,
  isLoading,
  initEdit,
  getUser,
  user
}) => {
  const id = match.params.userId;

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    password: '',
    repeat: ''
  });

  // const getUserById = (id, setUserData) => {
  //   axios
  //     .get(`http://localhost:5000/api/users/${id}`)
  //     .then(res => {
  //       setUserData({
  //         ...userData,
  //         firstname: res.data.firstname,
  //         lastname: res.data.lastname,
  //         sex: res.data.sex,
  //         age: res.data.age
  //       });
  //     })
  //     .catch(err => setAlert(err));
  // };

  // const cbGetUserById = useCallback((id, getUserById, setUserData) => {
  //   getUserById(id, setUserData);
  // }, id);

  useEffect(() => {
    getUser(id, setUserData);
    // return () => {
    //   setUserData({ ...user });
    // };
    // getUserById(id, setUserData);
  }, []);

  const { firstname, lastname, sex, age, password, repeat } = userData;

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    if (password !== repeat) {
      setAlert('Password does not match!');
    } else {
      editUser(
        { id, firstname, lastname, sex, age, password },
        history,
        initEdit
      ); // pass init and push into action-creator and let it exec
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  // in render it can do, but not recommand
  // if (editSuccess) {
  //   initEdit();
  //   history.push('/');
  // }

  return (
    <div>
      {//   editSuccess ? (
      //   <Redirect to='/' />
      // ) :
      isLoading ? (
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
                      ) ||
                      (user.firstname === firstname &&
                        user.lastname === lastname &&
                        user.sex === sex &&
                        user.age === age)
                    }
                  >
                    <i className='fas fa-arrow-down' /> Save Changes
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
    editSuccess: state.editUser.editSuccess,
    isLoading: state.editUser.isLoading,
    user: state.getUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: (data, history) => dispatch(editUser(data, history)),
    initEdit: () => dispatch(initEdit()),
    getUser: (id, setUserData) => dispatch(getUser(id, setUserData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
