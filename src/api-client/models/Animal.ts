import AnimalSafekeeping from "./AnimalSafekeeping";
import AnimalThreat from "./AnimalThreat";
import Habitat from "./Habitat";

type Animal = {
    id: string;

    name: string;
    species: string;
    description: string;
    behavior: string;
    photoUrl?: string; // Add the photoUrl property (optional or required as per your API)
    audioUrl?: string; // Add the audioUrl property if applicable

    //Relationships
    habitats: Habitat[];
    safekeepings: AnimalSafekeeping[];
    threats: AnimalThreat[];
};

export default Animal