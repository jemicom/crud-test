const express  = require( 'express');
const {
  getRoot, getUser, getUsers, createUser, searchUser, deleteUser, updateUser
} = require('../controls/users.js');

const router = express.Router();

router.get('/', getRoot);
router.get('/index', getRoot);
router.get('/user', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', searchUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

//export default router; 
module.exports = router;
