import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/userCases/createCategory/CreateCategoryController';
import listCategoriesController from '../modules/cars/userCases/listCategories';
import importCategoryController from '../modules/cars/userCases/importCategory';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    
    return importCategoryController().handle(request, response);
})

export { categoriesRoutes };