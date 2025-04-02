import mongoose from "mongoose";
/**
 * @file User Model 
 * @author Jaseem
 * 
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


interface UserDocument extends mongoose.Document{
    _id:mongoose.Types.ObjectId;
    name:string,
    password:string,
    email:string,
    createdAt:Date,
    updatedAt:Date,
}

const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
},{timestamps:true})

const UserModel = mongoose.model<UserDocument>("User",userSchema)
export default UserModel;
