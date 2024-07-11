import mongoose  from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['text', 'list'] },
    body: String,
    listItems: [String],
    isShared: Boolean,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
