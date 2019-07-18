import React from 'react';
import users from '../redux/reducers/users';

const Home = () => {
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
                  <td onClick={e => handleEdit(user._id)}>Edit</td>
                  <td onClick={e => handleDelete(user._id)}>Delete</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.sex}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
