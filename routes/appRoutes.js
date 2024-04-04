import express from "express";
import appController from "../controller/appController.js";
import { isAuthenticated } from "../middleware/authentication.js";
const appRoutes = express.Router();

appRoutes.use(isAuthenticated);
appRoutes.post("/updateProfile", appController.updateProfile);
appRoutes.get("/me", appController.getProfile);

export default appRoutes;
