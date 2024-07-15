import jwt, { decode } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import CustError from '../utils/CustomError.js';
import User from '../models/User.js';


export const signup = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        username: req.body.username,
        slug: req.body.slug,
        email: req.body.email,
        password: req.body.password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ data: user, token });
});

// @desc      Login
// @route     POST /api/v1/auth/login
// @access    Public
export const login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const isCorrect=await bcrypt.compare(req.body.password, user.password)
    

    if (!user || !isCorrect) {

        return next(new CustError('Incorrect email or password', 401));


    }
    // 3) Generate token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // delete the password from the response
    delete user._doc.password;
    
   

    res.status(200).json({ data: user, token });


});

// @desc     Make sure that user is logged in
export const auth = asyncHandler(async (req, res, next) => {
    // 1- Get token from header
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token);
    }
    if (!token) {
        return next(
            new CustError('You are not logged in. Please login to get access', 401)
        );
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
        return next(
            new CustError('The user that belong to this token does no longer exist')
        );
    }

    // Grant access to the protected routes
    req.user = currentUser;
    next();
});


// @desc    Authorization (User Permissions)
// ["admin", "user"]
export function allowedTo(...roles) {
    return asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new CustError('You are not allowed to access this route', 403)
            );
        }
        next();
    });
}