import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getPortfolioController,
  createPortfolioController,
  addProject,
  deleteProject,
} from "./portfolioControl.js";
import PortfolioServices from "../service/portfolioService.js";

vi.mock("../service/portfolioService");

describe("getPortfolioController", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { params: { id: "123" } };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });
  
  it("should return portfolio data with status 200", async () => {
    const mockPortfolio = { id: "123", title: "Test Portfolio" };

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      getPortfolioById: vi.fn().mockResolvedValue(mockPortfolio),
    }));

    await getPortfolioController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPortfolio);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      getPortfolioById: vi.fn().mockRejectedValue(error),
    }));

    await getPortfolioController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("createPortfolioController", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      body: {
        userId: "123",
        skills: ["JavaScript", "React"],
        projects: ["Project1", "Project2"],
        experience: "2 Years",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should create a portfolio and return it with status 201", async () => {
    const mockPortfolio = {
      userId: "123",
      skills: ["JavaScript", "React"],
      projects: ["Project1", "Project2"],
      experience: "2 Years",
    };

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      createPortfolio: vi.fn().mockResolvedValue(mockPortfolio),
    }));

    await createPortfolioController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPortfolio);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      createPortfolio: vi.fn().mockRejectedValue(error),
    }));

    await createPortfolioController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("addProject", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      params: { id: "123" },
      body: {
        projectName: "New Project",
        description: "Project Description",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should add a project to the portfolio and return it with status 201", async () => {
    const mockProject = {
      id: "456",
      projectName: "New Project",
      description: "Project Description",
    };

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      addProject: vi.fn().mockResolvedValue(mockProject),
    }));

    await addProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProject);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      addProject: vi.fn().mockRejectedValue(error),
    }));

    await addProject(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("deleteProject", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { params: { id: "123" }, body: { projectName: "Project1" } };
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    next = vi.fn();
  });

  it("should delete a project and return success message with status 204", async () => {
    const mockMessage = "Project deleted successfully";

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      removeProject: vi.fn().mockResolvedValue(mockMessage),
    }));

    await deleteProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith(mockMessage);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    const MockedPortfolioServices = PortfolioServices as unknown as {
      mockImplementation: (impl: () => any) => void;
    };

    MockedPortfolioServices.mockImplementation(() => ({
      removeProject: vi.fn().mockRejectedValue(error),
    }));

    await deleteProject(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
