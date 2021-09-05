import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

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

container.registerSingleton<IUsersRepository>(
    "UsersRepository", UsersRepository
);