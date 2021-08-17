import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/Repositories/SpecificationsRepository';
import { CreateCategoryUseCase } from '../modules/cars/userCases/CreateCategory/CreateCategoryUseCase';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateCategoryUseCase(specificationsRepository);

    createSpecificationService.execute({ name, description });

    return response.status(201).send();

});


export { specificationsRoutes };