import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "../const/config";

// Import Routes
import users from "./useCases/users/users.routes";
import operations from "./useCases/operations/operations.routes";
import category from "./useCases/category/category.routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(cors(config.settingCors));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(users);
app.use(operations);
app.use(category);

export default app;
