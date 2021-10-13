import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase'


class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoriesUseCase.execute();

        return response.json(all)
    }
}

export { ListCategoriesController }