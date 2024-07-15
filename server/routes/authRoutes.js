import express  from 'express';
import {
    signup,
    login,

} from '../controllers/authController.js';

import {
    signupValidator,
    loginValidator,
}  from '../utils/validators/authValidator.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);



export default router;
