import { CategoriesRepository } from "../../Repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "../createCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

export default(): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();
    
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;
}
