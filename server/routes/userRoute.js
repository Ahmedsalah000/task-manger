import express from 'express'
import {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
}  from '../utils/validators/userValidator.js';
import {auth,allowedTo} from '../controllers/authController.js';

const router = express.Router();


router
  .route('/')
  .get(auth, allowedTo('admin'), getUsers)
  .post(
    auth,
    allowedTo('admin'),
    createUserValidator,
    createUser
  );

router
  .route('/:id')
  .get(
    auth,
    allowedTo('admin'),
    getUserValidator,
    getUser
  )
  .put(
    auth,
    allowedTo('admin'),
    updateUserValidator,
    updateUser
  )
  .delete(
    auth,
    allowedTo('admin'),
    deleteUserValidator,
    deleteUser
  );

export default router;
