import { Router } from 'express';
import multer from 'multer';
import { createCategoryController } from '../modules/cars/userCases/createCategory';
import { listCategoriesController } from '../modules/cars/userCases/listCategories';
import { importCategoryController } from '../modules/cars/userCases/importCategory';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    
    return importCategoryController.handle(request, response);
})

export { categoriesRoutes };