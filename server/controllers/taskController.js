import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js'

export const createTask = asyncHandler(async (req, res) => {
    const { type, text, listItems, shared, category } = req.body;

    const task = await Task.create({ type, text, listItems, shared, category });

    res.status(201).json({ data: task });
})

export const getTasks=asyncHandler(async(req,res)=>{
    const tasks=await Task.find();
    res.status(200).json({data:tasks})

})

export const getOneTask=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const task=await Task.findById(id)
    res.status(200).json({data:task})

})

export const updateTask=asyncHandler(async(res,req)=>{
    const {id}=req.params;
    const task=await Task.findByIdAndUpdate( {_id: id },req.body,{new:true})
    res.status(200).json({data:task})
})

export const deleteTask=asyncHandler(async(res,req)=>{
    const {id}=req.params
    const task=await Task.findByIdAndDelete({_id:id})
    res.status(200).json({data:task})
})
