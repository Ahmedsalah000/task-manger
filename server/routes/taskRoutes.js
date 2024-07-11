import express from 'express'
import {
    getTasks,
    getOneTask,
    createTask,
    updateTask,
    deleteTask
}
    from '../controllers/taskController.js'
const router = express.Router();


router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id', getOneTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router