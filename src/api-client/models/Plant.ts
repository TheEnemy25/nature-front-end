import Habitat from "./Habitat";
import PlantSafekeeping from "./PlantSafekeeping";
import PlantThreat from "./PlantThreat";

type Plant = {
    id: string;

    name: string;
    species: string;
    description: string;

    //Relationships
    habitats: Habitat[];
    threats: PlantThreat[];
    safekeepings: PlantSafekeeping[];
};

export default Plant