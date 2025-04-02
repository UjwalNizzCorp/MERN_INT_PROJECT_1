import mongoose from "mongoose";
/**
 * @file Portfolio Model
 * @author Jaseem
 * 
 * @class Portfolio
 * @brief Represents a Portfolio of a user.
 *
 * @property {ObjectId} userId - The user's id.
 * @property {Array} skills - The user's skill (array).
 * @property {Array} projects - The user's projects (array).
 * @property {Array} experience - The user's experience (array).
 *
 * @method addProject - Adds a Project to the portfolio.
 * @method removeProject - Adds a Project to the portfolio.
 */



interface PortfolioDocument extends mongoose.Document {
    _id:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    skills:Array<string>;
    projects:Array<string>;
    experience:string,
}

const portfolioSchema = new mongoose.Schema<PortfolioDocument>({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
  skills: {
    type: [String],
    default: [],
  },
  projects: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    default: "",
  },
})

const PortfolioModel = mongoose.model<PortfolioDocument>("Portfolio",portfolioSchema)
export default PortfolioModel;
