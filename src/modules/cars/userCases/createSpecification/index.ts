import { SpecificationsRepository } from "../../Repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "../createSpecification/CreateSpecificationController"
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationsUseCase";




const categoriesRepository = new SpecificationsRepository;

const createSpecificationUseCase = new CreateSpecificationUseCase(categoriesRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };