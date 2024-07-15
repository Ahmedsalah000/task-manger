import slugify from 'slugify';
import asyncHandler from 'express-async-handler';

import Category from '../models/Category.js'

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    const userId = req.user._id
    // filter
    const queryStringObj = { ...req.query };
    const excludesFields = ['page', 'sort', 'limit', 'fields','keyword'];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    queryStr=JSON.parse(queryStr)
    let mongooseQuery = Category.find({user:userId,...queryStr})
    .skip(skip)
    .limit(limit)
//sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery = mongooseQuery.sort('-createAt');
    }


   
    //search

    if (req.query.keyword) {
        const keyword = req.query.keyword;
        mongooseQuery = mongooseQuery.find({ name: { $regex: keyword, $options: 'i' } });
    }

    const categories = await mongooseQuery;
    res.status(200).json({ results: categories.length, page, data: categories });
});
    
    



// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
export const createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({ user:req.user._id, name, slug: slugify(name) });
    res.status(201).json({ data: category });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );

    if (!category) {
        res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(204).json({ data: "is deleted successfully" })
});