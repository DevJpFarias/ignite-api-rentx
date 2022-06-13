import { getRepository, Repository } from "typeorm";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { database } from "@shared/infra/typeorm/helpers/db-connection-helper";

class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>;

    constructor () {
        this.repository = database.getRepository(Category);
    }

    async create({name, description}: ICreateCategoryDTO): Promise<void> {
        const repository = this.repository.create({
            description,
            name
        });

        await this.repository.save(repository);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find()
        return categories;
    }

    async findByName(name: string): Promise<Category>{
        const category = await this.repository.findOne({
            where: {
                name
            }
        });
        return category!;
    }
};

export { CategoriesRepository };