import Animal from "./Animal";
import Plant from "./Plant";

type Observation = {
    id: string;
    plantId: string;
    animalId: string;

    date: Date;
    notes: string;

    //Relationships
    plant: Plant;
    animal: Animal;
};

export default Observation