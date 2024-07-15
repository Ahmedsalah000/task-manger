import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js'
import CustError from '../utils/CustomError.js';



export const createTask = asyncHandler(async (req, res) => {
    const { title, type, body, listItems, isShared, category } = req.body;
    
    const task = await Task.create({ user:req.user._id,title, type, body, listItems, isShared, category });

    res.status(201).json({ data: task });
})

export const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id
    // filter
    const queryStringObj = { ...req.query };
    const excludesFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    
    
    queryStr=JSON.parse(queryStr)

    let mongooseQuery = Task.find({user:userId,...queryStr})
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
        let query = {}
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { body: { $regex: keyword, $options: 'i' } },
            { listItems: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } },

        ]

        mongooseQuery = mongooseQuery.find(query);
    }

    const tasks = await mongooseQuery;

    res.status(200).json({ results: tasks.length, page, data: tasks });





})

export const getOneTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
        return next(
            new CustError(`No task found for this id: ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ data: task })

})

export const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true })
    if (!task) {
        return next(
            new CustError(`No task found for this id: ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ data: task })
})

export const deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
        return next(
            new CustError(`No task found for this id: ${req.params.id}`, 404)
        )
    };
    res.status(200).json({ data: "is deleted successfully" })
})
