import Animal from "./Animal";
import Plant from "./Plant";

type Photo = {
    id: string;
    plantId: string;
    animalId: string;

    photoBytes: string;
    isPreview: boolean;

    //Relationships
    plant: Plant;
    animal: Animal;
};

export default Photo