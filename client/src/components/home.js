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

  const maxRowsPerPage = 10; // set max rows per page
  let i = 0; // init index of users
  // @@ is this DANGEROUS ?

  const [query, setQuery] = useState('');

  const [actAttr, setActAttr] = useState(null);
  const [sortOn, setSortOn] = useState(false); // click to sort, db click to unsort
  const [queryCur, setQueryCur] = useState(null); // store the query for search

  const [activePage, setActivePage] = useState(1);
  // if need remember page back, try redux

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = e => {
    // console.log(query);
    e.preventDefault();
    setQueryCur(query);
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
    setActivePage(activePage - 1);
  };

  const handleNextPage = e => {
    setActivePage(activePage + 1);
  };

  const handlePageChange = e => {
    // console.log(e.target.innerText);
    setActivePage(e.target.innerText);
  };

  return (
    <div>
      <div>
        <form onSubmit={e => handleSearch(e)}>
          Search: <input value={query} onChange={e => handleChange(e)} />
          {/* <input type='submit' value='Search' /> */}
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
            {(queryCur
              ? (sortOn ? sortUserByAttr(users, actAttr) : users).filter(
                  user =>
                    user.firstname
                      .toLowerCase()
                      .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
                    user.lastname
                      .toLowerCase()
                      .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
                    user.sex
                      .toLowerCase()
                      .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
                    user.age.toString().indexOf(queryCur.toString()) !== -1
                )
              : sortOn
              ? sortUserByAttr(users, actAttr)
              : users
            )
              .map(user => {
                return {
                  ...user,
                  index: i++
                };
              })
              .filter(
                user =>
                  (activePage - 1) * maxRowsPerPage <= user.index &&
                  activePage * maxRowsPerPage > user.index
              )
              .map(user => {
                return (
                  !isLoading &&
                  deleteIds.indexOf(user._id) === -1 && (
                    <tr className='user' key={user._id}>
                      <td>
                        <button onClick={e => handleEdit(user._id)}>
                          Edit
                        </button>
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
              <button onClick={e => handlePageChange(e)}>1</button>
            </li>
            <li>
              <button onClick={e => handlePageChange(e)}>2</button>
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
