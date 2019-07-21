import React, { useState, useEffect, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, getUser, getInit } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
// import axios from 'axios';

class EditUser extends Component {
  constructor({
    setAlert,
    editUser,
    alertContent,
    history,
    editSuccess,
    getUser,
    match,
    //
    prefirstname,
    prelastname,
    presex,
    preage,
    getSuccess,
    getInit
    //   user: { user, isLoading }
  }) {
    super({
      setAlert,
      editUser,
      alertContent,
      history,
      editSuccess,
      getUser,
      match,
      //
      prefirstname,
      prelastname,
      presex,
      preage,
      getSuccess,
      getInit
      //   user: { user, isLoading }
    });
    this.state = {
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
      password: '',
      repeat: ''
    };
    // const id = match.params.userId;
  }

  componentDidMount = () => {
    console.log(this.props);

    this.setState({
      id: this.props.match.params.userId,
      firstname: this.props.prefirstname,
      lastname: this.props.prelastname,
      sex: this.props.presex,
      age: this.props.preage
    });
    this.props.getUser(this.props.match.params.userId);
  };

  // const { firstname, lastname, sex, age, password, repeat } = userData;

  handleEdit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.repeat) {
      setAlert('Password does not match!');
    } else {
      const user = { ...this.state };
      this.props.editUser(user);
    }
  };

  handleChange = e => {
    console.log(this.props);
    // if (getSuccess) {
    //   console.log('i do');
    //   getInit();
    // }
    // getInit();
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleBack = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        {this.editSuccess ? (
          <Redirect to='/' />
        ) : (
          <div>
            <div>
              <form onSubmit={e => this.handleEdit(e)}>
                <small>Blank with * is reuiqred</small>
                <div>
                  * First Name:{' '}
                  <input
                    name='firstname'
                    value={this.state.firstname}
                    onChange={e => this.handleChange(e)}
                    placeholder='firstname'
                  />
                </div>
                <div>
                  * Last Name:{' '}
                  <input
                    name='lastname'
                    value={this.state.lastname}
                    onChange={e => this.handleChange(e)}
                    placeholder='lastname'
                  />
                </div>
                <div>
                  * Sex:{' '}
                  <input
                    name='sex'
                    value={this.state.sex}
                    onChange={e => this.handleChange(e)}
                    placeholder='sex'
                  />
                </div>
                <div>
                  * Age:{' '}
                  <input
                    name='age'
                    value={this.state.age}
                    onChange={e => this.handleChange(e)}
                    placeholder='age'
                  />
                </div>
                <div>
                  * Password:{' '}
                  <input
                    name='password'
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                    placeholder='password'
                  />
                </div>
                <div>
                  * Repet:{' '}
                  <input
                    name='repeat'
                    value={this.state.repeat}
                    onChange={e => this.handleChange(e)}
                    placeholder='repeat'
                  />
                </div>
                <div>
                  <input
                    value='Submit'
                    type='submit'
                    disabled={
                      //   false
                      !(
                        this.state.firstname &&
                        this.state.lastname &&
                        this.state.sex &&
                        this.state.age &&
                        this.state.password &&
                        this.state.repeat
                      )
                    }
                  />
                </div>
              </form>
              <div>{this.props.alertContent}</div>
            </div>
            <div>
              <button onClick={this.handleBack}>Back</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    editSuccess: state.editUser.editSuccess,
    prefirstname: state.getUser.firstname,
    prelastname: state.getUser.lastname,
    presex: state.getUser.sex,
    preage: state.getUser.age
    // isLoading: state.getUser.isLoading
    // user: state.getUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: data => dispatch(editUser(data)),
    getUser: id => dispatch(getUser(id)),
    getInit: () => dispatch(getInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
