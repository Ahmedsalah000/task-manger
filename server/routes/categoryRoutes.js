import express from 'express'
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
    from '../controllers/categoryController.js'

import {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
}    
    from '../utils/validators/categoryValidator.js'

import { auth,allowedTo } from '../controllers/authController.js'
const router = express.Router();

router.get('/', auth,allowedTo('user'),getCategories)
router.get('/:id',auth,allowedTo('user'),getCategoryValidator, getCategory)
router.post('/',auth,allowedTo('user'),createCategoryValidator, createCategory)
router.put('/:id',auth,allowedTo('user'),updateCategoryValidator, updateCategory)
router.delete('/:id',auth,allowedTo('user'),deleteCategoryValidator,deleteCategory)

export default router