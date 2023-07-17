import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer,
    required: false,
  },
  friends: [{ name: String }],
  posts: [{ title: String, content: String }],
  messages: [{ from: String, to: String, content: String, messageDate: Date }],
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
