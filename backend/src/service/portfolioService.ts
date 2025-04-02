import mongoose from "mongoose";
import PortfolioModel from "../model/PortfolioModle";
import ErrorMessage from "../utils/errorMessage";

/**
 * @author Jaseem
 * @class PortfolioServices
 * @description This class provides methods for managing user portfolios.
 *
 */
class PortfolioServices {
  /**
   * @brief Retrieves a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @returns {Promise<object>} - The portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  async getPortfolioById(id: string) {
    this.isValidObjectId(id);
    const portfolio = await PortfolioModel.findById(id);
    if (!portfolio) {
      throw new ErrorMessage(404, "Portfolio Doesn't exist");
    }
    return portfolio;
  }
  /**
   * @brief Creates a new portfolio for a user.
   * @param {string} userId - The ID of the user.
   * @param {Array} skills - The skills of the user.
   * @param {Array} projects - The projects of the user.
   * @param {Array} experience - The experience of the user.
   * @returns {Promise<object>} - The newly created portfolio object.
   * @throws {ErrorMessage} - Throws an error if the user ID is invalid.
   */
  async createPortfolio({
    userId,
    skills,
    projects,
    experience,
  }: {
    userId: string;
    skills: Array<string>;
    projects: Array<string>;
    experience: string;
  }) {
    const newPortfolio = new PortfolioModel({
      userId,
      skills,
      projects,
      experience,
    });

    await newPortfolio.save();
    return newPortfolio;
  }

  /**
   * @brief Updates a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @param {object} updatedPortfolio - The updated portfolio object.
   * @returns {Promise<object>} - The updated portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  async getAllPortfolio() {
    const portfolios = await PortfolioModel.find();
    return portfolios;
  }

  /**
   * @brief Updates a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @param {object} updatedPortfolio - The updated portfolio object.
   * @returns {Promise<object>} - The updated portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  isValidObjectId(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ErrorMessage(400, "Not a valid ObjectId");
    }
  }

  /**
   * @brief Updates a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @param {object} updatedPortfolio - The updated portfolio object.
   * @returns {Promise<object>} - The updated portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  async isExistingPortfolio(id: string) {
    const portfolio = await PortfolioModel.findById(id);
    if (!portfolio) {
      throw new ErrorMessage(404, "Portfolio Doesn't exist");
    }
  }

  /**
   * @brief Updates a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @param {object} project - The updated portfolio object.
   * @returns {Promise<object>} - The updated portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  async addProject(id: string, project: string) {
    const portfolio = await PortfolioModel.findById(id);
    if (!portfolio) {
      throw new ErrorMessage(404, "Portfolio not found");
    }
    portfolio.projects.push(project);
    await portfolio.save();
  }

  /**
   * @brief Updates a portfolio by its ID.
   * @param {string} id - The ID of the portfolio.
   * @param {object} removePrjt - The updated portfolio object.
   * @returns {Promise<object>} - The updated portfolio object.
   * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
   */
  async removeProject(id: string, removePrjt: string) {
    const portfolio = await PortfolioModel.findById(id);
    if (!portfolio) {
      throw new ErrorMessage(404, "Portfolio not found");
    }
    const projects = portfolio.projects.filter((pjt) => pjt !== removePrjt);
    portfolio.projects = projects;
    await portfolio.save();
  }
}

export default PortfolioServices;
