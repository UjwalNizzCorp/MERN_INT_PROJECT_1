import mongoose, { model, Schema } from "mongoose";

/**
 * @class Portfolio
 * @brief Represents a Portfolio of a user.
 *
 * @property {ObjectId} userId - The user's id.
 * @property {Array} skills - The user's skill (array).
 * @property {Array} experience - The user's experience (array).
 *
 * @method addProject - Adds a Project to the portfolio.
 * @method removeProject - Adds a Project to the portfolio.
 */

const portfolioSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
});

const PortfolioModel = model("Portfolio", portfolioSchema);
export default PortfolioModel;
