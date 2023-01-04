import mongoose from "mongoose";
import bcryptjs from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});
//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Encrypt password before saving user
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

// Compare password
// userSchema.methods.matchPassword = async function (password) {
//   // password is the password entered by the user
//   // this.password is the password stored in the database
//   // bcrypt.compare() will compare both the passwords
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);
export default User;
