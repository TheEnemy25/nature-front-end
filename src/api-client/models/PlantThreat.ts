import Plant from "./Plant";

type PlantThreat = {
    id: string;
    plantId: string;

    name: string;
    description: string;

    //Relationships
    plant: Plant;
};

export default PlantThreat