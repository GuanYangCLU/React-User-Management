import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  editSuccess,
  getUser,
  match,
  user
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
    let p = new Promise(() => {
      let b = {};
      console.log(user.firstname);
      return b;
    });
    p.then(res => getUser(id)).then(res => {
      console.log(user.firstname);
      setUserData({
        ...userData,
        firstname: user.firstname,
        lastname: user.lastname,
        sex: user.sex,
        age: user.age
      });
    });
  });

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
    user: state.getUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: data => dispatch(editUser(data)),
    getUser: id => dispatch(getUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
