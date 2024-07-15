import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['text', 'list'] },
    body: String,
    listItems: [String],
    isShared: Boolean,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: [true,'taske must belong to a user'],
    },

},
    { timestamps: true });

TaskSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',select:('username')
    })
    next()
})

const Task = mongoose.model('Task', TaskSchema);

export default Task;
