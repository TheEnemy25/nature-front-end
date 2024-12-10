import Animal from "./Animal";

type AnimalThreat = {
    id: string;
    animalId: string;

    name: string;
    description: string;

    //Relationships
    animal: Animal;
};

export default AnimalThreat