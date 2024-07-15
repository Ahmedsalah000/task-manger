import slugify from 'slugify';
import { check, body } from 'express-validator';
import {
    validatorMiddleware,
}  from '../../middlewares/validatorMiddleware.js';


export const createTaskValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .notEmpty()
        .withMessage('Task required')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    
    check('type')
        .isIn(['text', 'list'])
        .withMessage('Invalid task type'),

    check('body')
        .optional()
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }), 

    check('listItems')
        .optional()
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars'),

    check('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category id'),
        
    validatorMiddleware,
];
export const getTaskValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validatorMiddleware,
];

export const updateTaskValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    body('title')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,
];

export const deleteTaskValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validatorMiddleware,
];
