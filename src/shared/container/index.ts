import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/Repositories/ICategoriesRepository';

import { CategoriesRepository } from '../../modules/cars/Repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/Repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/Repositories/ISpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", SpecificationsRepository
);