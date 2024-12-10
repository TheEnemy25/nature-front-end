import Plant from "./Plant";

type PlantSafekeeping = {
    id: string;
    plantId: string;

    name: string;
    description: string;

    //Relationships
    plant: Plant;
};

export default PlantSafekeeping