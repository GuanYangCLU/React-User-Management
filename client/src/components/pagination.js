import React from 'react';

const Pagination = ({
  queryCur,
  sortType,
  users,
  actAttr,
  activePage,
  maxRowsPerPage,
  activeUser,
  setActivePage
}) => {
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

  return (
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
            (activeUser(queryCur, sortType, users, actAttr).length - 1) /
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
                (activeUser(queryCur, sortType, users, actAttr).length - 1) /
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
                (activeUser(queryCur, sortType, users, actAttr).length - 1) /
                  maxRowsPerPage
              )
            }
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
