import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

/**
 * @class User
 * @brief Represents a user in the system.
 *
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email (unique).
 * @property {string} password - The hashed password.
 *
 * @method hashPassword - Hashes the user's password.
 * @method comparePassword - Compares entered password with hashed password.
 */

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;
