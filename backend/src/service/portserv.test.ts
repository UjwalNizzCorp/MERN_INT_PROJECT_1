import { describe, it, expect, vi, beforeEach ,Mock} from "vitest";
import PortfolioService from "./portfolioService.js";
import PortfolioModel from "../model/PortfolioModle.js";
import ErrorMessage from "../utils/errorMessage.js";
import mongoose from "mongoose";

vi.mock("../model/PortfolioModle.js", () => ({
  default: {
    findById: vi.fn(),
    find: vi.fn(),
  },
}));

describe("getPortfolioById,", () => {
  let service: PortfolioService;

  beforeEach(() => {
    service = new PortfolioService();
    vi.clearAllMocks();
  });

  it("should return portfolio if found", async () => {
    const mockPortfolio = { id: "123", name: "My Portfolio" };
    vi.spyOn(service, "isValidObjectId").mockImplementation(() => true);
    (PortfolioModel.findById as any).mockResolvedValueOnce(mockPortfolio);

    const result = await service.getPortfolioById("123");
    expect(result).toEqual(mockPortfolio);
    expect(service.isValidObjectId).toHaveBeenCalledWith("123");
    expect(PortfolioModel.findById).toHaveBeenCalledWith("123");
  });

  it("should throw error if portfolio not found", async () => {
    vi.spyOn(service, "isValidObjectId").mockImplementation(() => true);
    (PortfolioModel.findById as any).mockResolvedValueOnce(null);

    await expect(service.getPortfolioById("123")).rejects.toThrowError(
      new ErrorMessage(404, "Portfolio Doesn't exist")
    );
  });

  it('should validate object ID before fetching', async () => {
    const spy = vi.spyOn(service, 'isValidObjectId').mockImplementation(() => true);
    (PortfolioModel.findById as any).mockResolvedValueOnce({ id: '123' });
  
    await service.getPortfolioById('123');
  
    expect(spy).toHaveBeenCalledWith('123');
    expect(PortfolioModel.findById).toHaveBeenCalledWith('123');
  });  
});
describe("getAllPortfolio", () => {
  let service: PortfolioService;

  beforeEach(() => {
    service = new PortfolioService();
    vi.clearAllMocks();
  });

  it("should return all portfolios", async () => {
    const mockPortfolios = [
      { id: "123", name: "Portfolio1" },
      { id: "456", name: "Portfolio2" },
    ];

    (PortfolioModel.find as Mock).mockResolvedValueOnce(mockPortfolios);

    const result = await service.getAllPortfolio();

    expect(result).toEqual(mockPortfolios);
    expect(PortfolioModel.find).toHaveBeenCalledTimes(1);
  });

});

describe("isValidObjectId", () => {
  let service: PortfolioService;

  beforeEach(() => {
    service = new PortfolioService();
  });

  it("should not throw an error for valid ObjectId", () => {
    const validId = new mongoose.Types.ObjectId().toString();

    expect(() => service.isValidObjectId(validId)).not.toThrow();
  });

  it("should throw ErrorMessage for invalid ObjectId", () => {
    const invalidId = "not-a-valid-id";

    expect(() => service.isValidObjectId(invalidId)).toThrowError(
      new ErrorMessage(400, "Not a valid ObjectId")
    );
  });
});
describe("isExistingPortfolio", () => {
  let service: PortfolioService;
  beforeEach(() => {
    service = new PortfolioService();
    vi.clearAllMocks();
  });
 it("should throw an error if portfolio does not exist", async () => {
    const mockId = "123";
    (PortfolioModel.findById as Mock).mockResolvedValueOnce(null);

    await expect(service.isExistingPortfolio(mockId)).rejects.toThrowError(
      new ErrorMessage(404, "Portfolio Doesn't exist")
    );
  });


})
describe("addProject", () => {
  let service: PortfolioService;

  beforeEach(() => {
    service = new PortfolioService();
    vi.clearAllMocks();
  });

  it("should add a project to the portfolio", async () => {
    const mockProject = "New Project";
    const mockPortfolio = {
      id: "123",
      projects: [],
      save: vi.fn().mockResolvedValue(true), 
    };

    (PortfolioModel.findById as Mock).mockResolvedValueOnce(mockPortfolio);

    await service.addProject("123", mockProject);

    expect(mockPortfolio.projects).toContain(mockProject); 
    expect(mockPortfolio.save).toHaveBeenCalledTimes(1);
  });

  it("should throw error if portfolio is not found", async () => {
    (PortfolioModel.findById as Mock).mockResolvedValueOnce(null);

    await expect(service.addProject("invalidId", "Some Project")).rejects.toThrowError(
      new ErrorMessage(404, "Portfolio not found")
    );
  });
});

describe("removeProject", () => {
  let service: PortfolioService;
  beforeEach(() => {
    service = new PortfolioService();
    vi.clearAllMocks();
  });


  it("should remove a project from the portfolio", async () => {
    const mockProject = "Project1";
    const mockPortfolio = {
      id: "123",
      projects: [mockProject, "Project2"],
      save: vi.fn().mockResolvedValue(true), 
    };

    (PortfolioModel.findById as Mock).mockResolvedValueOnce(mockPortfolio);

    await service.removeProject("123", mockProject);

    expect(mockPortfolio.projects).not.toContain(mockProject); 
    expect(mockPortfolio.save).toHaveBeenCalledTimes(1);
  });

})
// describe("createPortfolio", () => {
//     let service: PortfolioService;
    
//     beforeEach(() => {
//         service = new PortfolioService();
//         vi.clearAllMocks();
//     });
    
//     it("should create a new portfolio", async () => {
//         const mockPortfolio = { id: "123", name: "My Portfolio" };
//         const userId = "user123";
//         const skills = ["JavaScript", "React"];
//         const projects = ["Project1", "Project2"];
//         const experience = "2 years";
    
//         vi.spyOn(PortfolioModel.prototype, "save").mockResolvedValueOnce(mockPortfolio as any);
    
//         const result = await service.createPortfolio({
//         userId,
//         skills,
//         projects,
//         experience,
//         });
    
//         expect(result).toEqual(mockPortfolio);
//     });
//     }
// )