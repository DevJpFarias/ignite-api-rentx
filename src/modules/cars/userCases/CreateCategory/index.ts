import { CategoriesRepository } from "../../Repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "../createCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";


const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };