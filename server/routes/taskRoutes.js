import express from 'express'
import {
    getTasks,
    getOneTask,
    createTask,
    updateTask,
    deleteTask
}
    from '../controllers/taskController.js'
import{
    getTaskValidator,
    createTaskValidator,
    updateTaskValidator,
    deleteTaskValidator
}
    from '../utils/validators/taskValidator.js' 
import {
    auth,allowedTo
} from '../controllers/authController.js'   

    const router = express.Router();


router.post('/',auth,allowedTo('user'), createTaskValidator,createTask)
router.get('/', auth,allowedTo('user'),getTasks)
router.get('/:id',auth,allowedTo('user'), getTaskValidator,getOneTask)
router.put('/:id', auth,allowedTo('user'),updateTaskValidator, updateTask)
router.delete('/:id', auth,allowedTo('user'),deleteTaskValidator,deleteTask)


export default router