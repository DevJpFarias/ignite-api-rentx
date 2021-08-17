
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificarionsRepository {

    create({ name, description}: ICreateSpecificationDTO): void;
}