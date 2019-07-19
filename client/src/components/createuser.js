import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';

const CreateUser = ({ setAlert, createUser }) => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    sex: '',
    age: '',
    password: '',
    repeat: ''
  });

  const { firstname, lastname, sex, age, password, repeat } = userData;

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
      <div>
        <form onSubmit={e => handleCreate(e)}>
          <div>
            <input
              name='firstname'
              value={firstname}
              onChange={e => handleChange(e)}
              placeholder='firstname'
            />
          </div>
          <div>
            <input
              name='lastname'
              value={lastname}
              onChange={e => handleChange(e)}
              placeholder='lastname'
            />
          </div>
          <div>
            <input
              name='sex'
              value={sex}
              onChange={e => handleChange(e)}
              placeholder='sex'
            />
          </div>
          <div>
            <input
              name='age'
              value={age}
              onChange={e => handleChange(e)}
              placeholder='age'
            />
          </div>
          <div>
            <input
              name='password'
              value={password}
              onChange={e => handleChange(e)}
              placeholder='password'
            />
          </div>
          <div>
            <input
              name='repeat'
              value={repeat}
              onChange={e => handleChange(e)}
              placeholder='repeat'
            />
          </div>
          <div>
            <input value='Submit' type='submit' />
          </div>
        </form>
      </div>
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    // users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    createUser: ({ userData }) => dispatch(createUser({ userData }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
