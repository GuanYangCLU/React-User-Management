const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});

// Incase we need this API
router.get('/:userId', (req, res) => {
  User.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'No user found by this id' }));
});

// search by Fname, Lname, Sex, and Age -- { query: input }
// Just naive search, for high level search, need rewrite
router.post('/search', (req, res) => {
  User.find()
    .then(users =>
      users.filter(
        user =>
          user.firstname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.lastname
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.sex
            .toLowerCase()
            .indexOf(req.body.query.toString().toLowerCase()) !== -1 ||
          user.age.toString().indexOf(req.body.query.toString()) !== -1
      )
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'No user found' }));
});

// Sort user by fn, ln, sex, age -- by attribute
router.post('/sort', (req, res) => {
  // console.log(req.body.attribute);
  User.find()
    .then(users => {
      switch (req.body.attribute) {
        // Don't change the USERS array!
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
    })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: 'Failed to sort' }));
});

// Create user
router.post('/', (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    sex: req.body.sex,
    age: req.body.age,
    password: req.body.password
  });
  newUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to create' + err }));
});

// Edit user
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      sex: req.body.sex,
      age: req.body.age,
      password: req.body.password
    }
  })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to edit' }));
});

// Delete user
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: 'Failed to delete' }));
});

module.exports = router;
