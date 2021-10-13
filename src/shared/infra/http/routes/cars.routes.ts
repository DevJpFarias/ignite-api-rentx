import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { Router } from "express";

const carsRoutes = Router()

const createCarController = new CreateCategoryController()

carsRoutes.post("/", createCarController.handle)

export { carsRoutes }