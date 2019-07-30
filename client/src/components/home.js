import React, { useState, useEffect } from 'react';
import { setUserList } from '../redux/action-creators/users';
import { connect } from 'react-redux';
import { initUser, initEdit, deleteUser } from '../redux/action-creators/users';
import { Loading, Alert } from './utils';
import Pagination from './pagination';
import Table from './table';

const Home = ({
  users,
  setUserList,
  history,
  initUser,
  initEdit,
  deleteUser,
  isLoading,
  error,
  deleteError
}) => {
  useEffect(() => {
    initUser();
    initEdit();
    setUserList();
  }, []); //initUser, initEdit, setUserList

  const maxRowsPerPage = 10; // set max rows per page

  // state part ******
  const [query, setQuery] = useState(''); // search input
  const [goToPage, setGoToPage] = useState(''); // goto input

  const [actAttr, setActAttr] = useState(''); // sort by which attribute
  const [sortType, setSortType] = useState(0); // default/asc/desc
  const [queryCur, setQueryCur] = useState(''); // store the query for search

  const [activePage, setActivePage] = useState(1); // current page

  // sortType: 1 for ascend, 2 for descend, 0 for default
  // if need remember page back, try redux

  // function define part *****

  // handle functions, process logic and actions
  const handleChange = e => {
    if (e.target.id === 'search') {
      setQuery(e.target.value);
    } else if (e.target.id === 'goto') {
      setGoToPage(e.target.value);
    }
  };

  const handleCreate = e => {
    history.push('/createuser');
  };

  const handleSearch = e => {
    e.preventDefault();
    // protect out of page
    setActivePage(1);
    setQueryCur(query);
  };

  const handleEdit = id => {
    history.push(`/edituser/${id}`);
  };

  const handleDelete = id => {
    deleteUser(id);
    // setDeleteId(id);
  };

  const handlePageGoTo = e => {
    // console.log(e.target.tagName); // FORM
    e.preventDefault();
    if (
      !isNaN(goToPage) &&
      goToPage >= 1 &&
      goToPage <=
        parseInt(
          (activeUser(queryCur, sortType, users, actAttr).length - 1) /
            maxRowsPerPage
        ) +
          1
    )
      setActivePage(parseInt(goToPage)); // prevent invalid input
    // in case decimal: 1.2, 2.6, ...
  };

  const handleSort = e => {
    if (e.target.id === actAttr) {
      setSortType((sortType + 1) % 3);
    } else {
      setSortType(1);
    }
    // Clear the sort type from another attribute
    setActAttr(e.target.id);
  };

  // -------------------------------------------------------
  // child function for selectUser, sort logic
  const sortUserByAttr = (users, attribute) => {
    // Don't change the USERS array!
    // ignore Upper and Lower differences, sex can be F/M or whole word
    switch (attribute) {
      case 'firstname':
        return [...users].sort((a, b) =>
          a.firstname.toLowerCase() > b.firstname.toLowerCase()
            ? 1
            : a.firstname.toLowerCase() === b.firstname.toLowerCase()
            ? a.lastname.toLowerCase() > b.lastname.toLowerCase()
              ? 1
              : a.lastname.toLowerCase() === b.lastname.toLowerCase()
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      case 'lastname':
        return [...users].sort((a, b) =>
          a.lastname.toLowerCase() > b.lastname.toLowerCase()
            ? 1
            : a.lastname.toLowerCase() === b.lastname.toLowerCase()
            ? a.firstname.toLowerCase() > b.firstname.toLowerCase()
              ? 1
              : a.firstname.toLowerCase() === b.firstname.toLowerCase()
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
                  ? 1
                  : -1
                : -1
              : -1
            : -1
        );

      case 'sex':
        return [...users].sort((a, b) =>
          a.sex.toLowerCase().slice(0, 1) > b.sex.toLowerCase().slice(0, 1)
            ? 1
            : a.sex.toLowerCase().slice(0, 1) ===
              b.sex.toLowerCase().slice(0, 1)
            ? a.firstname.toLowerCase() > b.firstname.toLowerCase()
              ? 1
              : a.firstname.toLowerCase() === b.firstname.toLowerCase()
              ? a.lastname.toLowerCase() > b.lastname.toLowerCase()
                ? 1
                : a.lastname.toLowerCase() === b.lastname.toLowerCase()
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
            ? a.firstname.toLowerCase() > b.firstname.toLowerCase()
              ? 1
              : a.firstname.toLowerCase() === b.firstname.toLowerCase()
              ? a.lastname.toLowerCase() > b.lastname.toLowerCase()
                ? 1
                : a.lastname.toLowerCase() === b.lastname.toLowerCase()
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
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

  // @ searchUser, selectUser are child functions for setActiveUser
  const searchUser = (users, queryCur) => {
    // this func filter users based on search query
    return users.filter(
      user =>
        user.firstname
          .toLowerCase()
          .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
        user.lastname
          .toLowerCase()
          .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
        user.sex.toLowerCase().indexOf(queryCur.toString().toLowerCase()) !==
          -1 ||
        user.age.toString().indexOf(queryCur.toString()) !== -1
    );
  };

  const selectSort = (sortType, users, actAttr) => {
    // this func sort users based on sort type
    switch (sortType) {
      case 1:
        return sortUserByAttr(users, actAttr);
      case 2:
        return [...sortUserByAttr(users, actAttr)].reverse();
      default:
        return users;
    }
  };

  // IMPORTANT function to calculate active users
  const activeUser = (queryCur, sortType, users, actAttr) => {
    // this func return results after search and then sorting
    if (queryCur) {
      const searchedUsers = searchUser(users, queryCur);
      return selectSort(sortType, searchedUsers, actAttr);
    } else {
      return selectSort(sortType, users, actAttr);
    }
  };
  // old expression:
  // (queryCur
  //   ? (sortType === 1
  //       ? sortUserByAttr(users, actAttr)
  //       : sortType === 2
  //       ? [...sortUserByAttr(users, actAttr).reverse()]
  //       : users
  //     ).filter(user => searchUser(user, queryCur))
  //   : sortType === 1
  //   ? sortUserByAttr(users, actAttr)
  //   : sortType === 2
  //   ? [...sortUserByAttr(users, actAttr).reverse()]
  //   : users
  // )
  // ------------------------------------------------------------

  //render part ********
  if (
    activeUser(queryCur, sortType, users, actAttr).length > 0 &&
    activeUser(queryCur, sortType, users, actAttr).length ===
      (activePage - 1) * maxRowsPerPage
  ) {
    // if it is this page's last user, after delete, back to prev page
    // empty list stay in 1st page
    setActivePage(activePage - 1);
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <label className='navbar-brand'>User List</label>

        <form className='form-inline' onSubmit={e => handlePageGoTo(e)}>
          Go to page:{' '}
          <input
            className='form-control mr-sm-2'
            type='goto'
            placeholder='Go to page'
            aria-label='GoTo'
            id='goto'
            value={goToPage}
            onChange={e => handleChange(e)}
          />
        </form>

        <form className='form-inline' onSubmit={e => handleSearch(e)}>
          Search:{' '}
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            id='search'
            value={query}
            onChange={e => handleChange(e)}
          />
          {/* <input type='submit' value='Search' /> */}
        </form>

        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}

        <button
          className='btn btn-outline-success'
          onClick={e => handleCreate()}
        >
          <i className='fas fa-user' /> Create
        </button>
      </nav>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <Table
              queryCur={queryCur}
              sortType={sortType}
              users={users}
              actAttr={actAttr}
              maxRowsPerPage={maxRowsPerPage}
              activeUser={activeUser}
              activePage={activePage}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleSort={handleSort}
            />

            {/* Pagination Bar */}
            <Pagination
              queryCur={queryCur}
              sortType={sortType}
              users={users}
              actAttr={actAttr}
              maxRowsPerPage={maxRowsPerPage}
              activeUser={activeUser}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            {error && <Alert waring='server' item='get' />}
            {deleteError && <Alert waring='server' item='delete' />}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading,
    error: state.users.error,
    deleteError: state.users.deleteError
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
