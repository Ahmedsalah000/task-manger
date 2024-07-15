import slugify from 'slugify';
import { check, body } from 'express-validator';
import {
  validatorMiddleware,
}  from '../../middlewares/validatorMiddleware.js';
import User  from  '../../models/User.js';
// Check email is email
// check if password confirm = password
// check if email already in user
// make validation like schema
export const signupValidator = [
  check('username')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('username required field')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email required field')
    .isEmail()
    .withMessage('Invalid email formate')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error(`E-mail already in use`));
        }
      })
    ),
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('must be at least 6 chars')
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        throw new Error(`Password confirmation is incorrect`);
      }
      return true;
    }),
  check('passwordConfirm')
    .notEmpty()
    .withMessage('passwordConfirm is required field'),

  validatorMiddleware,
];

export const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required field')
    .isEmail()
    .withMessage('Invalid email formate'),

  check('password').notEmpty().withMessage('Password required'),

  validatorMiddleware,
];
