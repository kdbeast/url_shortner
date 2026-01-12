import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    // gravatar
    default: function () {
      return gravatar(this.email);
    },
  },
});

function gravatar(email) {
  return `https://www.gravatar.com/avatar/${email}?s=200&d=retro`;
}

export default model("User", userSchema);
