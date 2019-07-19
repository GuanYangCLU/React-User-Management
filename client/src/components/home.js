import React, { useState, useEffect } from 'react';
import { setUserList } from '../redux/action-creators/users';
import { connect } from 'react-redux';

const Home = ({ users, setUserList }) => {
  useEffect(() => setUserList());

  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = e => {
    //
  };

  const handleCreate = e => {
    //
  };

  const handleEdit = e => {
    //
  };

  const handleDelete = e => {
    //
  };

  const handlePrevPage = e => {
    //
  };

  const handleNextPage = e => {
    //
  };

  return (
    <div>
      <div>
        <form onSubmit={e => handleSearch(e)}>
          <input value={query} onChange={e => handleChange(e)} />
          <input type='submit' value='Search' />
        </form>
      </div>
      <div>
        <div>
          <table>
            <thead>
              <th>Edit</th>
              <th>Delete</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Age</th>
            </thead>
            {users.map(user => {
              return (
                <tr className='user' key={user._id}>
                  <td>
                    <button onClick={e => handleEdit(user._id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={e => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.sex}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={e => handlePrevPage()}>Prev Page</button>
          <ul style={{ display: 'flex', listStyle: 'none' }}>
            <li>
              <button>1</button>
            </li>
            <li>
              <button>2</button>
            </li>
            ...
            <li>
              <button>8</button>
            </li>
            <li>
              <button>9</button>
            </li>
          </ul>
          <button onClick={e => handleNextPage()}>Next Page</button>
        </div>
      </div>
      <div>
        <button onClick={e => handleCreate()}>Create New User</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

const mapStateToDispatch = dispatch => {
  return {
    setUserList: () => dispatch(setUserList())
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Home);
