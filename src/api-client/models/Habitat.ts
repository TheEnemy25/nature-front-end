import Animal from "./Animal";
import Plant from "./Plant";
import ReserveArea from "./ReserveArea";

type Habitat = {
    id: string;
    reserveAreaId: string;

    name: string;
    location: string;
    type: string;

    //Relationships
    reserveArea: ReserveArea;
    animals: Animal[];
    plants: Plant[];
};

export default Habitat