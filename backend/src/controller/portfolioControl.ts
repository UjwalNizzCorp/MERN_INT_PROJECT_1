import PortfolioServices from "../service/portfolioService.js";
import { Request, Response, NextFunction } from "express";

/**
 * @author Jaseem
 * @breef This class provides methods for managing user portfolios.
 */

/**
 * @breef Retrieves a portfolio by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} - The portfolio object.
 * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
 */
export const getPortfolioController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { getPortfolioById } = new PortfolioServices();
  try {
    const id = req.params.id;
    const portfolio = await getPortfolioById(id);
    res.status(200).json(portfolio);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @breef Retrieves all portfolios.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<object>} - The portfolio object.
 * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
 */
export const createPortfolioController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { createPortfolio } = new PortfolioServices();
  try {
    // const { userId, skills, projects, experience } = req.create_port;
    const { userId, skills, projects, experience } = req.body;
    const id = userId.toString();
    const portfolio = await createPortfolio({
      userId: id,
      skills,
      projects,
      experience,
    });
    res.status(201).json(portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<object>} - The project object.
 * @function addProject - Adds a project to a portfolio.
 *
 */
export const addProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { addProject } = new PortfolioServices();
  try {
    // const project = await addProject(req.params.id, req.port_project);
    const project = await addProject(req.params.id, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
//  * @returns {Promise<object>} - The project object.
 * @function deleteProject - Deletes a project from a portfolio.
 */

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * @property {string} projectId - The ID of the project.
   * @function deleteProject - call the removeProject method in PortfolioServices.js.
   */

  const { removeProject } = new PortfolioServices();
  try {
    // const deltedProject = await removeProject(req.params.id, req.port_project);
    const deltedProject = await removeProject(req.params.id, req.body.projectName);
    res.status(204).send(deltedProject);
  } catch (error) {
    next(error);
  }
};
