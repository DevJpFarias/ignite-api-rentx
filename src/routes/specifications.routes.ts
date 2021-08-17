import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/Repositories/SpecificationsRepository';
import { CreateCategoryService } from '../modules/cars/Services/CreateCategoryService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateCategoryService(specificationsRepository);

    createSpecificationService.execute({ name, description });

    return response.status(201).send();

});


export { specificationsRoutes };