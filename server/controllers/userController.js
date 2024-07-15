import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js'

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Public
export const getUsers = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: users.length, page, data: users });
});

// @desc    Get specific User by id
// @route   GET /api/v1/users/:id
// @access  Public
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.status(404).json({ msg: `No User for this id ${id}` });
    }
    res.status(200).json({ data: user });
});

// @desc    Create User
// @route   POST  /api/v1/users
// @access  Private
export const createUser = asyncHandler(async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        slug: req.body.slug,
        email: req.body.email,
        password: req.body.password,
    });
    res.status(201).json({ data: user });
});

// @desc    Update specific User
// @route   PUT /api/v1/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    const user = await User.findOneAndUpdate(
        { _id: id },
        { username, slug: slugify(username) },
        { new: true }
    );

    if (!user) {
        res.status(404).json({ msg: `No User for this id ${id}` });
    }
    res.status(200).json({ data: user });
});

// @desc    Delete specific User
// @route   DELETE /api/v1/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        res.status(404).json({ msg: `No User for this id ${id}` });
    }
    res.status(204).json({data:'user deleted successfully'})
});