import React, { useState, useEffect } from 'react';
import { setUserList } from '../redux/action-creators/users';
import { connect } from 'react-redux';
import { initUser, initEdit, deleteUser } from '../redux/action-creators/users';

const Home = ({
  users,
  setUserList,
  history,
  initUser,
  initEdit,
  deleteUser,
  deleteIds,
  isLoading
}) => {
  useEffect(() => {
    initUser();
    initEdit();
    setUserList();
  }, []);

  const [query, setQuery] = useState('');

  const [actAttr, setActAttr] = useState(null);
  const [sortOn, setSortOn] = useState(false);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = e => {
    //
  };

  const handleCreate = e => {
    history.push('/createuser');
  };

  const handleEdit = id => {
    history.push(`/edituser/${id}`);
  };

  const handleDelete = id => {
    deleteUser(id);
    // setDeleteId(id);
    // console.log(id, 'del');
  };

  const handleSort = e => {
    setSortOn(!sortOn);
    setActAttr(e.target.id);
  };

  const sortUserByAttr = (users, attribute) => {
    // Don't change the USERS array!
    switch (attribute) {
      case 'firstname':
        return [...users].sort((a, b) =>
          a.firstname > b.firstname
            ? 1
            : a.firstname === b.firstname
            ? a.lastname > b.lastname
              ? 1
              : a.lastname === b.lastname
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.sex > b.sex
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      case 'lastname':
        return [...users].sort((a, b) =>
          a.lastname > b.lastname
            ? 1
            : a.lastname === b.lastname
            ? a.firstname > b.firstname
              ? 1
              : a.firstname === b.firstname
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.sex > b.sex
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      case 'sex':
        return [...users].sort((a, b) =>
          a.sex > b.sex
            ? 1
            : a.sex === b.sex
            ? a.firstname > b.firstname
              ? 1
              : a.firstname === b.firstname
              ? a.lastname > b.lastname
                ? 1
                : a.lastname === b.lastname
                ? a.age > b.age
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      case 'age':
        // console.log([...users][0].age);
        return [...users].sort((a, b) =>
          a.age > b.age
            ? 1
            : a.age === b.age
            ? a.firstname > b.firstname
              ? 1
              : a.firstname === b.firstname
              ? a.lastname > b.lastname
                ? 1
                : a.lastname === b.lastname
                ? a.sex > b.sex
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      default:
        return [...users];
    }
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
              <th id='firstname' onClick={e => handleSort(e)}>
                First Name
              </th>
              <th id='lastname' onClick={e => handleSort(e)}>
                Last Name
              </th>
              <th id='sex' onClick={e => handleSort(e)}>
                Sex
              </th>
              <th id='age' onClick={e => handleSort(e)}>
                Age
              </th>
            </thead>
            {(sortOn ? sortUserByAttr(users, actAttr) : users).map(user => {
              return (
                !isLoading &&
                deleteIds.indexOf(user._id) === -1 && (
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
                )
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
      {/* <div>{deleteIds.length + ' here! ' + isLoading + users.length}</div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    deleteIds: state.deleteUser.deleteIds,
    isLoading: state.users.isLoading
  };
};

const mapStateToDispatch = dispatch => {
  return {
    setUserList: () => dispatch(setUserList()),
    initUser: () => dispatch(initUser()),
    initEdit: () => dispatch(initEdit()),
    deleteUser: id => dispatch(deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Home);
