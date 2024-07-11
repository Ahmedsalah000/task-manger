import crypto from 'crypto';

import { verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';

import createToken from '../utils/createToken';

import { create, findOne, findById } from '../models/userModel';

export const signup = asyncHandler(async (req, res, next) => {

    const user = await create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const token = createToken(user._id);

    res.status(201).json({ data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {

    const user = await findOne({ email: req.body.email });

    if (!user || !(await compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    const token = createToken(user._id);

    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
});

export const protect = asyncHandler(async (req, res, next) => {
    // 1) Check if token exist, if exist get
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(
            new ApiError(
                'You are not login, Please login to get access this route',
                401
            )
        );
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await findById(decoded.userId);
    if (!currentUser) {
        return next(
            new ApiError(
                'The user that belong to this token does no longer exist',
                401
            )
        );
    }

    // 4) Check if user change his password after token created
    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        // Password changed after token created (Error)
        if (passChangedTimestamp > decoded.iat) {
            return next(
                new ApiError(
                    'User recently changed his password. please login again..',
                    401
                )
            );
        }
    }

    req.user = currentUser;
    next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
export function allowedTo(...roles)    {     return asyncHandler(async (req, res, next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError('You are not allowed to access this route', 403)
            );
        }
        next();
    });     }