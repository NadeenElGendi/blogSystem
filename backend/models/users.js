import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return compare(candidatePassword, this.password);
};

export default model('User', UserSchema);