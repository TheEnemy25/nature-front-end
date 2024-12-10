import AnimalSafekeeping from "./AnimalSafekeeping";
import AnimalThreat from "./AnimalThreat";
import Habitat from "./Habitat";

type Animal = {
    id: string;

    name: string;
    species: string;
    description: string;
    behavior: string;

    //Relationships
    habitats: Habitat[];
    safekeepings: AnimalSafekeeping[];
    threats: AnimalThreat[];
};

export default Animal