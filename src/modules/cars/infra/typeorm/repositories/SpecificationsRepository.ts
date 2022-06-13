import { In } from 'typeorm';
import { Repository } from 'typeorm';
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationRepository";
import { database } from '@shared/infra/typeorm/helpers/db-connection-helper';


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor () {
        this.repository = database.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);

        return specification
    }

    async findByName(name: string): Promise<Specification>{
        const specification = await this.repository.findOne({
            where: { name }
        });
        return specification!;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const id_array = In([ids])

        const specifications = await this.repository.findBy({
            id:  id_array 
        })

        return specifications
    }

}

export { SpecificationsRepository }