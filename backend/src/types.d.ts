import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      port_project: string;
      create_port: {
        skills: Array<string>;
        projects: Array<string>;
        experience: string;
        userId: mongoose.Types.ObjectId;
      };
      reg_user: {
        name: string;
        email: string;
        password: string;
      };
      log_user: {
        email: string;
        password: string;
      };
      taskbody: {
        name?: string;
        email?: string;
        password?: string;
      };
    }
  }
}
