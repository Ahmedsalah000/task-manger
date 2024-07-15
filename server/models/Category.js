import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, lowercase: true, },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

},
{ timestamps: true });


CategorySchema.pre(/^find/,function(next){
    this.populate({
        path:'user',select:('username')
    })
    next()
})





const Category = mongoose.model('Category', CategorySchema);

export default Category;
