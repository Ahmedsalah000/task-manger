import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
   // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
