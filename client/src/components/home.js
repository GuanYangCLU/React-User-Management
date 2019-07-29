import React, { useState, useEffect } from 'react';
import { setUserList } from '../redux/action-creators/users';
import { connect } from 'react-redux';
import { initUser, initEdit, deleteUser } from '../redux/action-creators/users';
import Loading, { Alert } from './loading';

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
  const [query, setQuery] = useState('');
  const [goToPage, setGoToPage] = useState('');

  const [actAttr, setActAttr] = useState(''); // sort by which attribute
  const [sortType, setSortType] = useState(0); // click to sort, db click to unsort
  const [queryCur, setQueryCur] = useState(''); // store the query for search

  const [activePage, setActivePage] = useState(1);

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

  const handleSort = e => {
    if (e.target.id === actAttr) {
      setSortType((sortType + 1) % 3);
    } else {
      setSortType(1);
    }
    // Clear the sort type from another attribute
    setActAttr(e.target.id);
  };

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

  const handlePrevPage = e => {
    setActivePage(activePage - 1);
  };

  const handleNextPage = e => {
    setActivePage(activePage * 1 + 1); // sometimes 1+1 = 11
  };

  const handlePageChange = (e, page) => {
    // console.log(e.target.innerText);
    // setActivePage(e.target.innerText);
    // for button(btn dont have value), but don't recommend use innerText
    setActivePage(page); // for button(btn dont have value)
  };

  const handleFirstPage = e => {
    setActivePage(1);
  };

  const handleLastPage = e => {
    setActivePage(
      parseInt(
        (activeUser(queryCur, sortType, users, actAttr).length - 1) /
          maxRowsPerPage
      ) + 1
    );
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
    // console.log(activePage, 'act');
  };

  // Expressive functions, show how to display
  const setPagination = (pageLen, curPage) => {
    // curPage: careful string to int
    // return Array for map: [1,2,'...',9 ]
    // Logic here
    const neighborLen = 1;
    const actLen = 2 * neighborLen + 1; // in act page, then length of linked part
    // [...Array(100).keys()] OR [...Array.from({ length: 100 }).keys()]
    if (pageLen < actLen * 2) {
      // console.log('here', pageLen, actLen, users.length);
      return [...Array.from({ length: pageLen }, (v, k) => k + 1)];
      // pageNum + 1, We will get: [1,2,3,4,5]
    } else if (curPage < actLen + 1) {
      // pageLen >= actLen * 2
      // [1,2,3,'...',6]
      return [
        ...Array.from({ length: actLen }, (v, k) => k + 1),
        '...',
        pageLen
      ];
    } else if (curPage > pageLen - actLen) {
      // [1, ... , 4, 5, 6]
      return [
        1,
        '...',
        ...Array.from({ length: actLen }, (v, k) => k + pageLen - actLen + 1)
      ];
    } else {
      // [1, ... , 3,4,5, ..., 7]
      return [
        1,
        '...',
        ...Array.from(
          { length: actLen },
          (v, k) => k + curPage * 1 - neighborLen
        ),
        '...',
        pageLen
      ];
    }
  };

  const showOrder = attr => {
    return (
      actAttr === attr &&
      (sortType === 1 ? (
        <i className='fas fa-arrow-up sort' />
      ) : (
        sortType === 2 && <i className='fas fa-arrow-down sort' />
      ))
    );
  };

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

  const activeUser = (queryCur, sortType, users, actAttr) => {
    // this func return results after search and then sorting
    if (queryCur) {
      const searchedUsers = searchUser(users, queryCur);
      return selectSort(sortType, searchedUsers, actAttr);
    } else {
      return selectSort(sortType, users, actAttr);
    }
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
  };

  const displayUser = (
    queryCur,
    sortType,
    users,
    actAttr,
    activePage,
    maxRowsPerPage
  ) => {
    return activeUser(queryCur, sortType, users, actAttr).slice(
      (activePage - 1) * maxRowsPerPage,
      activePage * maxRowsPerPage
    );
  };

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
            <div>
              <table className='table table-sm'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                    <th scope='col' id='firstname' onClick={e => handleSort(e)}>
                      First Name {showOrder('firstname')}
                    </th>
                    <th scope='col' id='lastname' onClick={e => handleSort(e)}>
                      Last Name {showOrder('lastname')}
                    </th>
                    <th scope='col' id='sex' onClick={e => handleSort(e)}>
                      Sex {showOrder('sex')}
                    </th>
                    <th scope='col' id='age' onClick={e => handleSort(e)}>
                      Age {showOrder('age')}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {displayUser(
                    queryCur,
                    sortType,
                    users,
                    actAttr,
                    activePage,
                    maxRowsPerPage
                  ).map(user => {
                    return (
                      <tr className='user' key={user._id}>
                        <td>
                          <button
                            className='btn btn-outline-primary btn-sm'
                            onClick={e => handleEdit(user._id)}
                          >
                            <i className='fas fa-pen' /> Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-outline-danger btn-sm'
                            onClick={e => handleDelete(user._id)}
                          >
                            <i className='fas fa-trash' /> Delete
                          </button>
                        </td>
                        <td>
                          <div className='table-data'>{user.firstname}</div>
                        </td>
                        <td>
                          <div className='table-data'>{user.lastname}</div>
                        </td>
                        <td>
                          <div className='table-data'>{user.sex}</div>
                        </td>
                        <td>
                          <div className='table-data'>{user.age}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <div>{users.length}</div> */}
            </div>

            {/* Pagination Bar */}
            <div className='page-bar'>
              <ul className='page-list'>
                <li>
                  <button
                    className='page-btn'
                    onClick={e => handleFirstPage()}
                    disabled={activePage < 2}
                  >
                    {'<<'}
                  </button>
                </li>
                <li>
                  <button
                    className='page-btn'
                    onClick={e => handlePrevPage()}
                    disabled={activePage < 2}
                  >
                    {'<'}
                  </button>
                </li>
                {setPagination(
                  parseInt(
                    (activeUser(queryCur, sortType, users, actAttr).length -
                      1) /
                      maxRowsPerPage
                  ) + 1,
                  activePage
                ).map(page => {
                  if (page === '...') {
                    return (
                      <li>
                        <div>...</div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={page}>
                        <button
                          // className='page-btn'
                          className={
                            'page-btn ' +
                            (page.toString() === activePage.toString()
                              ? 'btn-active'
                              : 'btn-disactive')
                          }
                          onClick={e => handlePageChange(e, page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                })}
                <li>
                  <button
                    className='page-btn'
                    onClick={e => handleNextPage()}
                    disabled={
                      activePage >
                      parseInt(
                        (activeUser(queryCur, sortType, users, actAttr).length -
                          1) /
                          maxRowsPerPage
                      )
                    }
                  >
                    {'>'}
                  </button>
                </li>
                <li>
                  <button
                    className='page-btn'
                    onClick={e => handleLastPage()}
                    disabled={
                      activePage >
                      parseInt(
                        (activeUser(queryCur, sortType, users, actAttr).length -
                          1) /
                          maxRowsPerPage
                      )
                    }
                  >
                    {'>>'}
                  </button>
                </li>
              </ul>
            </div>
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
