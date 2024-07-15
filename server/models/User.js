import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  taskes:[{
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
  }],
},
  { timestamps: true });
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();// if not modified happens 
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


const User = mongoose.model('User', UserSchema);


export default User