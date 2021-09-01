import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/Repositories/ICategoriesRepository';

import { CategoriesRepository } from '../../modules/cars/Repositories/implementations/CategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
);