import Animal from "./Animal";

type AnimalSafekeeping = {
    id: string;
    animalId: string;

    name: string;
    description: string;

    //Relationships
    animal: Animal;
};

export default AnimalSafekeeping